
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
final_file_path = 'res/hospital/merged/merged_hospital_price.csv'


def get_api_url(page_no:int):
    return base_url + api_name + f"?serviceKey={service_key}&numOfRows={num_of_rows}&pageNo={page_no}"


def get_xml_items(xml_data:str):
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


class HospitalService:

    def __init__(self):
        pass
    
    
    def update_hospital_data_file(self):
        write_index = 1
        file_paths = []
        end = False
        while not end:
            file_path = f'res/hospital/before_merge/page_{write_index}.csv'
            api_url = get_api_url(write_index)
            
            try :
                xml_data = get_response(api_url)
                xml_items = get_xml_items(xml_data) 
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
                
    
    def update_hospital_db(self):
        
        values = get_values_from_csv(final_file_path, ['ykiho', 'npayCd', 'curAmt'])
        ykiho_list = values['ykiho']
        npay_cd_list = values['npayCd']
        cur_amt_list = values['curAmt']
        
        session = Session()
        new_entities = set()
        created_at = datetime.datetime.now()
        
        #쿼리문 hospital_repo에서 가져와야함
        #TODO : 현재는 ykiho로 찾으려고 했을 때 반드시 하나가 나오도록 되어있음. 없는 경우를 고려해야 함.
        hospital_id_list = [hospital.hospital_id for hospital in session.query(Hospital).filter(Hospital.ykiho.in_(ykiho_list)).all()]
        for hospital_id, npay_cd, cur_amt in zip(hospital_id_list, npay_cd_list, cur_amt_list):
            #common_repo에서 가져와야 함
            price = find_or_create_if_not_exist(session, Price, treatment_id=npay_cd, hospital_id=hospital_id)
            price.max_price = max(price.max_price, int(cur_amt))
            price.min_price = min(price.min_price, int(cur_amt))
            
            price_id = price.price_id
            #price_history_repo에서 가져와야 함
            session.query(PriceHistory).filter_by(price_id=price_id, is_latest=True).update({PriceHistory.is_latest: False})
            
            #price_history_repo에서 가져와야 함
            new_price_history = PriceHistory(price_id=price_id, price=int(cur_amt), created_at=created_at)
            new_entities.add(new_price_history)
        session.add_all(new_entities)

        session.commit()
        session.close()
        return {"message":"success"}





