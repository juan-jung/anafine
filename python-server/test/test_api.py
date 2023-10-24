import requests
import xml.etree.ElementTree as ET
import csv
import os
from dotenv import load_dotenv
load_dotenv(verbose=True)


base_url = "http://apis.data.go.kr/B551182/nonPaymentDamtInfoService/"
api_name = "getNonPaymentItemHospDtlList"
service_key = os.environ.get('PUBLIC_DATA_API_KEY')

def get_api_url(page_no:int, num_of_rows=10000):
    return base_url + api_name + f"?serviceKey={service_key}&pageNo={page_no}&numOfRows={num_of_rows}"


def get_xml_data(page_no):
    api_url = get_api_url(page_no)
    response = requests.get(api_url)
    
    if response.status_code == 200:
        return response.text 
    else:
        raise Exception(f"HTTP Error: {response.status_code}")


def write_csv(page_no, xml_data) -> bool: # throws 
    root = ET.fromstring(xml_data)
    
    error_code = None
    try : 
        error_code = root.find(".//resultCode").text
    except AttributeError: # resultCode가 없으면 returnReasonCode를 받는다.
        error_code = root.find(".//returnReasonCode").text

    if error_code != '00':
        raise Exception(f"API response Error: {error_code}")
    
    items = root.find(".//items")
    if not items:
        print(f"Page {page_no} has no items.")
        return False
    
    # 해당 경로가 없으면 경로먼저 만들기
    if not os.path.exists('res/pre_converted'):
        os.makedirs('res/pre_converted')
        
    with open(f'res/pre_converted/converted_{page_no}.csv', 'w', newline='', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile, delimiter='|')
        
        # 첫 번째 아이템을 이용하여 헤더 생성
        first_item = items[0]
        headers = [elem.tag for elem in first_item]
        csvwriter.writerow(headers)
        
        # 아이템 데이터 작성
        for item in items:
            row_data = [item.find(tag).text if item.find(tag) is not None else '' for tag in headers]
            csvwriter.writerow(row_data)
    return True


if __name__ == '__main__':
    write_index = 24
    has_item = True
    while has_item:
        try :
            has_item = write_csv(write_index, get_xml_data(write_index))
            if has_item :
                print(f'Page {write_index} is written.')
                write_index += 1
        except Exception as e:
            print(f'Page {write_index} is not written. Error: {e}')
    
    with open('res/final_converted.csv', 'w', newline='', encoding='utf-8') as f_out:
        writer = csv.writer(f_out, delimiter='|')
        for i in range(1, write_index):
            with open(f'res/pre_converted/converted_{i}.csv', 'r', newline='', encoding='utf-8') as f_in:
                reader = csv.reader(f_in, delimiter='|')
                if i == 1:
                    writer.writerow(next(reader))
                else:
                    next(reader)
                for row in reader:
                    writer.writerow(row)
    print('All pages are written.')