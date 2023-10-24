import requests
import xml.etree.ElementTree as ET
import csv
import os


base_url = "http://apis.data.go.kr/B551182/nonPaymentDamtInfoService/"
api_name = "getNonPaymentItemHospDtlList"
service_key = os.environ.get('PUBLIC_DATA_API_KEY')


def get_api_url(page_no:int, num_of_rows=1000):
    return base_url + api_name + f"?serviceKey={service_key}&pageNo={page_no}&numOfRows={num_of_rows}"


def get_xml_data(page_no):
    api_url = get_api_url(page_no)
    response = requests.get(api_url)
    
    if response.status_code == 200:
        return response.text 
    else:
        return f"Error: {response.status_code}"


def write_csv(page_no, xml_data):
    root = ET.fromstring(xml_data)
    items = root.find(".//items")
    with open(f'res/pre_converted/converted_{page_no}.csv', 'w', newline='', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile, delimiter='|')
        if not items:
            return False
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
    write_index = 1
    while write_csv(write_index, get_xml_data(write_index)):
        print(f'Page {write_index} is written.')
        write_index += 1

    # Combine all CSV files into one
    with open('res/final_converted.csv', 'w', newline='', encoding='utf-8') as f_out:
        writer = csv.writer(f_out, delimiter='|')
        for i in range(1, write_index+1):
            with open(f'pre_converted/converted_{i}.csv', 'r', newline='', encoding='utf-8') as f_in:
                reader = csv.reader(f_in, delimiter='|')
                if i == 1:
                    writer.writerow(next(reader))
                else:
                    next(reader)
                for row in reader:
                    writer.writerow(row)


#공공데이터 API 요청을 통해 병원 정보를 가져오는 서비스
class HospitalService:

    def __init__(self):
        pass
