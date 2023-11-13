
import xml.etree.ElementTree as ET
import csv
import os
from app.util.csv_util import xml_to_csv, merge_csvs, get_values_from_csv
from app.util.request_util import get_response
from app.domain import Session
from app.domain.entity import Hospital, Price, PriceHistory, Treatment
from app.domain.repository.common_repository import find_or_create_if_not_exist
import datetime

base_url = "http://apis.data.go.kr/B551182/nonPaymentDamtInfoService/"
api_name = "getNonPaymentItemHospDtlList"
service_key = os.environ.get('PUBLIC_DATA_API_KEY')
num_of_rows = 10000

base_directory = 'resource/data/price' 
before_merge_file_directory = f'{base_directory}/before_merge' #res/price/before_merge/page_{page_no}.csv
final_file_path = f'{base_directory}/recent_price.csv'


def get_hosprice_api_url(page_no:int):
    return base_url + api_name + f"?serviceKey={service_key}&numOfRows={num_of_rows}&pageNo={page_no}"


def get_hosprice_xml_items(xml_data:str):
    root = ET.fromstring(xml_data)
    
    error_code = None
    try : 
        error_code = root.find(".//resultCode").text
    except AttributeError: # resultCode가 없으면 returnReasonCode를 받는다.
        error_code = root.find(".//returnReasonCode").text
    if error_code != '00': # 공공데이터 api 서버에서 에러 발생
        raise Exception(f"API response Error: {error_code}")
    
    items = root.find(".//items")
    if not items:
        return False
    return items


class HospitalPriceService:
    
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:   # 인스턴스가 아직 생성되지 않았다면
            cls._instance = super(HospitalPriceService, cls).__new__(cls)  # 새 인스턴스 생성
        return cls._instance  # 인스턴스 반환

    def __init__(self):
        pass
    
    def update_hospital_price_data_file(self):
        write_index = 1
        file_paths = []
        end = False
        while not end:
            file_path = f'{before_merge_file_directory}/page_{write_index}.csv'
            api_url = get_hosprice_api_url(write_index)
            
            try :
                xml_data = get_response(api_url)
                xml_items = get_hosprice_xml_items(xml_data) 
            except Exception as e:
                print(f'Page {write_index} is not written. Error: {e}')
                print("retrying...")
                continue
            
            end = not bool(xml_items) # 정상적으로 빈 값을 받았다면 종료
            if not end :
                xml_to_csv(file_path, xml_items)
                file_paths.append(file_path)
                write_index += 1
        print(f'All pages are written.')
        
        merge_csvs(final_file_path, file_paths)
        print(f'merged page are written.')
        
        return {"message":"success"}
                
    
    def update_hospital_price_db(self):
        
        values = get_values_from_csv(final_file_path, ['ykiho', 'npayCd', 'curAmt', 'yadmNpayCdNm'])
        ykiho_list = values['ykiho']
        npay_cd_list = values['npayCd']
        cur_amt_list = values['curAmt']
        yadm_npay_cd_nm_list = values['yadmNpayCdNm']
        
        with Session() as session:
            new_entities = set()
            created_at = datetime.datetime.now()
            
            #쿼리문 hospital_repo에서 가져와야함
            hospitals = session.query(Hospital).filter(Hospital.ykiho.in_(ykiho_list)).all()
            hospital_dict = {hospital.ykiho: hospital for hospital in hospitals}
            hospital_id_list = [hospital_dict[ykiho].hospital_id if ykiho in hospital_dict else None for ykiho in ykiho_list ]
            
            updated_prices = set()
            max_len = len(hospital_id_list)
            i = 0
            for hospital_id, npay_cd, cur_amt, yadm_npay_cd_nm in zip(hospital_id_list, npay_cd_list, cur_amt_list, yadm_npay_cd_nm_list):
                i += 1
                if i % 10000 == 0:
                    spent_time = (datetime.datetime.now() - created_at).total_seconds()
                    print(f'{i/max_len*100:.2f}% done... time : {spent_time:.1f} sec, expected_left_time : {spent_time/i*(max_len-i):.1f} sec, expected_total_time : {spent_time/i*(max_len):.1f} sec')
                if not hospital_id:
                    continue
                
                #common_repo에서 가져와야 함
                price = find_or_create_if_not_exist(session, Price, treatment_id=npay_cd, hospital_id=hospital_id)
                price.max_price = max(price.max_price, int(cur_amt))
                price.min_price = min(price.min_price, int(cur_amt))
                
                price_id = price.price_id
                updated_prices.add(price_id)
                
                new_price_history = PriceHistory(price_id=price_id, cost=int(cur_amt), significant=yadm_npay_cd_nm, created_at=created_at)
                new_entities.add(new_price_history)
            session.query(PriceHistory)\
                    .filter(PriceHistory.price_id.in_(updated_prices))\
                    .filter(PriceHistory.is_latest == True)\
                    .update({PriceHistory.is_latest: False})
            session.add_all(new_entities)

            session.commit()
            print('hospital -- price, price_history session commited')
            
        return {"message":"success"}


