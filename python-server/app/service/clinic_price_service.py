import xml.etree.ElementTree as ET
import csv
import os
from app.util.csv_util import xml_to_csv, merge_csvs, get_values_from_csv
from app.util.request_util import get_response
from app.domain import Session
from app.domain.entity import Hospital, Price, PriceHistory, Treatment
from app.domain.repository.common_repository import find_or_create_if_not_exist
import datetime
from dataclasses import dataclass, field


MAX_QUEUE_SIZE = 1000


@dataclass
class PriceData:
    div: str
    price: str
    info: str

@dataclass
class TreatmentData:
    middle_category: str
    small_category: str
    detail_category: str
    price_datas: list[PriceData] = field(default_factory=list)

@dataclass
class HospitalData:
    hospital_id: str
    hospital_name: str
    treatment_datas: list[TreatmentData] = field(default_factory=list)

# step 1.
# 기존 세션에서 31 의원 51 치과의원 93 한의원인 병원들 리스트를 가져올 것이다.
# 이들에 대해, modified_at을 기준으로 오래된 애들부터 1000개 가져온다.
# 세션을 롤백한다. 이 경우에도 가져온 1000개는 그대로 유지된다. 
# 가져온 애들의 modified_at에 현재 시간을 넣어준다.
# flush 해준다. # 이거 메모리가 아니라 db에서 해주는게 나을것 같은데, queue 탑재 시간을 따로 관리하고
# queue를 db에 따로 저장해주는 게 나을 것 같기는 해 추후 수정 해보자고
# 세션에서 가져온 객체들에서 {'hospital_id":hospital_id, 'hospital_name':hospital_name} 형태로 정보를 얻어, deque에 넣어준다.

# step 1
clinic_codes = set([31, 51, 93])
def get_new_hospital_infos(session, num_of_hospitals:int) -> list[dict]:
    hospital_infos = []
    hospitals = session.query(Hospital)\
                    .filter(Hospital.hospital_type_id.in_(clinic_codes))\
                    .filter(Hospital.is_in_queue == False)\
                    .order_by(Hospital.modified_at)\
                    .limit(num_of_hospitals)\
                    .all()
    for hospital in hospitals:
        hospital.is_in_queue = True
    
    for hospital in hospitals:
        hospital_infos.append({'hospital_id':hospital.hospital_id, 'hospital_name':hospital.hospital_name, 'hospital_address':hospital.address.split(',')[0]})
    return hospital_infos


# step 1-1
# deque에 추가한다.
from collections import deque


# step 2
def get_hospital_infos_from_deque(info_deque:deque, nums:int) -> list[dict]:
    return [info_deque.popleft() for _ in range(nums)]

def crawl_hospital_info(hospital_infos:list[dict]) -> list[HospitalData]|None:
    try:
        from app.service.hira_crawling_service import do_crawling
        import asyncio
        return asyncio.run(do_crawling(hospital_infos))
    except Exception as e:
        print(e)
        print("ERROR: 크롤링 중 에러가 발생했습니다.")
        return None


class ClinicPriceService:
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:   # 인스턴스가 아직 생성되지 않았다면
            cls._instance = super(ClinicPriceService, cls).__new__(cls)  # 새 인스턴스 생성
        return cls._instance  # 인스턴스 반환

    def __init__(self):
        self.running = False
    
    def start_data_collection(self):
        return {"message":"success"}

    def stop_data_collection(self):
        self.running = False
        return {"message":"stop success"}

    def show_state_crawling(self):
        if self.running :
            return {"message":"running state crawling"}
        else :
            return {"message":"stop state crawling"} 
        
    def test(self, nums):
        hospital_infos_deque = deque()
        self.running = True
        
        while self.running :
            if len(hospital_infos_deque) < nums :
                with Session() as session:
                    session.query(Hospital)\
                        .filter(Hospital.is_in_queue == True)\
                        .update({Hospital.is_in_queue:False})
                    session.query(Hospital)\
                        .filter(Hospital.hospital_id.in_([info['hospital_id'] for info in hospital_infos_deque]))\
                        .update({Hospital.is_in_queue:True})
                    hospital_infos = get_new_hospital_infos(session, MAX_QUEUE_SIZE - len(hospital_infos_deque))
                    session.commit()
                hospital_infos_deque.extend(hospital_infos)
            now_infos = get_hospital_infos_from_deque(hospital_infos_deque, nums)
            
            with Session() as session:
                session.query(Hospital)\
                    .filter(Hospital.hospital_id.in_([info['hospital_id'] for info in now_infos]))\
                    .filter(Hospital.is_in_queue == True)\
                    .update({Hospital.is_in_queue:False, Hospital.modified_at:datetime.datetime.now()})
                session.commit()
                
            hospital_datas = crawl_hospital_info(now_infos)
            if not hospital_datas : # 데이터를 가져오는데 실패했을 경우
                return {"message":"crawling error"}
            
            print("데이터 로딩 성공!")
            
            with Session() as new_session:
                new_entities = []
                updated_prices = set()
                for hospital_data in hospital_datas:
                    hospital = find_or_create_if_not_exist(new_session, Hospital, hospital_id=hospital_data.hospital_id)
                    hospital.modified_at = datetime.datetime.now()
                    
                    for treatment_data in hospital_data.treatment_datas:
                        path_of_treatment = f"{treatment_data.middle_category}/{treatment_data.small_category}"
                        if treatment_data.detail_category : # 빈 문자열이면 false
                            path_of_treatment += f"/{treatment_data.detail_category}"
                        treatment = find_or_create_if_not_exist(new_session, Treatment, path = path_of_treatment)
                        
                        created_at = datetime.datetime.now()
                        
                        for price_data in treatment_data.price_datas:
                            price = find_or_create_if_not_exist(new_session, Price, treatment_id=treatment.treatment_id, hospital_id=hospital.hospital_id)
                            cur_cost = int(price_data.price.replace(',', ''))
                            price.max_price = max(price.max_price, cur_cost)
                            price.min_price = min(price.min_price, cur_cost)
                            updated_prices.add(price.price_id)
                            
                            price_history = PriceHistory(price_id=price.price_id, cost=cur_cost, significant=price_data.div, info=price_data.info, created_at=created_at)
                            new_entities.append(price_history)
                if updated_prices:
                    new_session.query(PriceHistory)\
                            .filter(PriceHistory.price_id.in_(updated_prices))\
                            .filter(PriceHistory.is_latest == True)\
                            .update({PriceHistory.is_latest: False})
                new_session.add_all(new_entities)
                new_session.commit()
                print("커밋 성공")
        
        



