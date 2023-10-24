
import xml.etree.ElementTree as ET
import os
from app.util.csv_util import xml_to_csv, merge_csvs
from app.util.request_util import get_response


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
        #csv 파일을 열어서
        #price_history에서 is_latest = True인 애들을 is_latest = False로 바꾼다.
        #db에서 ykiho를 가지는 병원의 hospital_id를 찾는다. 없으면 에러
        #db에서 treatment_id = {npayCd}이고 hospital_id = {hospital_id}인 애를 hospital_price 테이블에서 찾는다.
            #없으면 insert 후 해당 애의 id값 가지고 있기
        #hospital_price_id를 fk로 가지는 애를 price_history에서 새로 생성
        return {"message":"success"}
