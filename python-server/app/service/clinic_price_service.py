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
from collections import deque, defaultdict
import threading
lock = threading.Lock()
import json
MAX_QUEUE_SIZE = 1000
from app.util.request_util import get_response


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
        address_parts = hospital.address.split(',')[0].split(' ')
        address = ' '.join(address_parts[:-1])
        hospital_infos.append({'hospital_id':hospital.hospital_id, 'hospital_name':hospital.hospital_name, 'hospital_address':address})
    return hospital_infos

def get_hospital_infos_from_deque(info_deque:deque, nums:int) -> list[dict]:
    return [info_deque.popleft() for _ in range(nums)]
def convert_json_to_hospital_data(json_data:str) -> list[HospitalData]:
    hospital_data_list = []
    for hospital_dict in json.loads(json_data):
        # TreatmentData 리스트 생성
        treatment_datas = []
        for treatment_dict in hospital_dict.get('treatment_datas', []):
            # PriceData 리스트 생성
            price_datas = [PriceData(**price_dict) for price_dict in treatment_dict.get('price_datas', [])]
            treatment_data = TreatmentData(middle_category=treatment_dict['middle_category'],
                                           small_category=treatment_dict['small_category'],
                                           detail_category=treatment_dict['detail_category'],
                                           price_datas=price_datas)
            treatment_datas.append(treatment_data)

        # HospitalData 객체 생성
        hospital_data = HospitalData(hospital_id=hospital_dict['hospital_id'],
                                     hospital_name=hospital_dict['hospital_name'],
                                     treatment_datas=treatment_datas)
        hospital_data_list.append(hospital_data)
    return hospital_data_list


def crawl_hospital_info(hospital_infos:list[dict], crawling_server_url:str) -> list[HospitalData]:
    hospital_infos_json = json.dumps(hospital_infos)
    response = get_response(f"http://{crawling_server_url}/crawl/hira", type='POST', json=hospital_infos_json)
    return convert_json_to_hospital_data(response)


def check_and_refill_deque(hospital_info_deque:deque, nums:int):
    if len(hospital_info_deque) < nums :
        with Session() as session:
            session.query(Hospital)\
                .filter(Hospital.is_in_queue == True)\
                .update({Hospital.is_in_queue:False})
            session.query(Hospital)\
                .filter(Hospital.hospital_id.in_([info['hospital_id'] for info in hospital_info_deque]))\
                .filter(Hospital.is_in_queue == False)\
                .update({Hospital.is_in_queue:True})
            session.flush()
            
            hospital_infos = get_new_hospital_infos(session, MAX_QUEUE_SIZE - len(hospital_info_deque))
            session.query(Hospital)\
                .filter(Hospital.hospital_id.in_([info['hospital_id'] for info in hospital_infos]))\
                .filter(Hospital.is_in_queue == False)\
                .update({Hospital.is_in_queue:True})
                
            hospital_info_deque.extend(hospital_infos)
            session.commit()
            


class ClinicPriceService:
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:   # 인스턴스가 아직 생성되지 않았다면
            cls._instance = super(ClinicPriceService, cls).__new__(cls)  # 새 인스턴스 생성
        return cls._instance  # 인스턴스 반환

    def __init__(self):
        self.running_dict = defaultdict(bool)
        self.hospital_info_deque = deque()
    
    def start_data_collection(self, nums:int, crawling_server_url:str):
        if self.running_dict[crawling_server_url] : 
            return {"message":"already running"}
        self.running_dict[crawling_server_url] = True 
        while self.running_dict[crawling_server_url] :
            with lock:
                check_and_refill_deque(self.hospital_info_deque, nums)
            
            with Session() as session:
                now_infos = get_hospital_infos_from_deque(self.hospital_info_deque, nums)
                try :
                    session.query(Hospital)\
                        .filter(Hospital.hospital_id.in_([info['hospital_id'] for info in now_infos]))\
                        .filter(Hospital.is_in_queue == True)\
                        .update({Hospital.is_in_queue:False, Hospital.modified_at:datetime.datetime.now()})
                    
                    hospital_datas = crawl_hospital_info(now_infos, crawling_server_url)
                    if not hospital_datas : # 데이터를 가져오는데 실패했을 경우
                        return {"message":"crawling error"}
                    print(f"데이터 로딩 성공! - {crawling_server_url}")
                    
                    new_entities = []
                    updated_prices = set()
                    for hospital_data in hospital_datas:
                        hospital = find_or_create_if_not_exist(session, Hospital, hospital_id=hospital_data.hospital_id)
                        hospital.modified_at = datetime.datetime.now()
                        
                        for treatment_data in hospital_data.treatment_datas:
                            path_of_treatment = f"{treatment_data.middle_category}/{treatment_data.small_category}"
                            if treatment_data.detail_category : # 빈 문자열이면 false
                                path_of_treatment += f"/{treatment_data.detail_category}"
                            treatment = find_or_create_if_not_exist(session, Treatment, path = path_of_treatment)
                            
                            created_at = datetime.datetime.now()
                            
                            for price_data in treatment_data.price_datas:
                                price = find_or_create_if_not_exist(session, Price, treatment_id=treatment.treatment_id, hospital_id=hospital.hospital_id)
                                cur_cost = int(price_data.price.replace(',', ''))
                                price.max_price = max(price.max_price, cur_cost)
                                price.min_price = min(price.min_price, cur_cost)
                                updated_prices.add(price.price_id)
                                
                                price_history = PriceHistory(price_id=price.price_id, cost=cur_cost, significant=price_data.div, info=price_data.info, created_at=created_at)
                                new_entities.append(price_history)
                    if updated_prices:
                        session.query(PriceHistory)\
                                .filter(PriceHistory.price_id.in_(updated_prices))\
                                .filter(PriceHistory.is_latest == True)\
                                .update({PriceHistory.is_latest: False})
                    session.add_all(new_entities)
                    session.commit()
                    print(f"커밋 성공 - {crawling_server_url}")
                except Exception as e: #다시 deque 에 돌려놓고 멈추기
                    print(e)
                    print(f"데이터 로딩 실패! - {crawling_server_url}")
                    with lock:
                        self.hospital_info_deque.extend(now_infos)
                    self.running_dict[crawling_server_url] = False
                    return {"message":"crawling error"}
        return {"message":"running success"}

    def stop_data_collection(self, crawling_server_url:str):
        if crawling_server_url == 'all':
            self.running_dict = defaultdict(bool)
        self.running_dict[crawling_server_url] = False
        return {"message":"stop success"}

    def show_running_crwaling_server(self):
        return {"running_crawling_server":[key for key, value in self.running_dict.items() if value]}
        


