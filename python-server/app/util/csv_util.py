import xml.etree.ElementTree as ET
import csv
import os
import pandas as pd

def __create_directory_if_not_exists(file_path):
    # 해당 경로가 없으면 경로먼저 만들기
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

def xml_to_csv(file_path: str, xml_items: str, delimiter=',') -> bool: # throws 
    
    __create_directory_if_not_exists(file_path)
    with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile, delimiter=delimiter)
        # 첫 번째 아이템을 이용하여 헤더 생성
        first_item = xml_items[0]
        headers = [elem.tag for elem in first_item]
        csvwriter.writerow(headers)
        # 아이템 데이터 작성
        for item in xml_items:
            row_data = [item.find(tag).text if item.find(tag) is not None else '' for tag in headers]
            csvwriter.writerow(row_data)
            
    print(f'{file_path} is written.')


def merge_csvs(merged_file_path, file_paths:list, origin_delimiter=',', delimiter = ','):
    
    __create_directory_if_not_exists(merged_file_path)
    with open(merged_file_path, 'w', newline='', encoding='utf-8') as f_out:
        writer = csv.writer(f_out, delimiter=delimiter)
        has_header = False
        for file_path in file_paths:
            with open(file_path, 'r', newline='', encoding='utf-8') as f_in:
                reader = csv.reader(f_in, delimiter=origin_delimiter)
                if not has_header:
                    writer.writerow(next(reader))
                    has_header = True
                else:
                    next(reader)
                for row in reader:
                    writer.writerow(row)
    print('Final converted page are written.')
    

ex_set = dict({"":None, "False":False, "True":True, "FALSE":False, "TRUE":True})    
def get_values_from_csv(filepath, column_names, db_column_names = None, delimiter=','):
    if db_column_names is None:
        db_column_names = column_names
    with open(filepath, 'r', newline='', encoding='utf-8') as f_in:
        reader = csv.reader(f_in, delimiter=delimiter)
        
        headers = next(reader)
        indexs = [headers.index(index_name) for index_name in column_names]
        
        result = dict({name:[] for name in db_column_names})
        for row in reader:
            for index, name in zip(indexs, db_column_names):
                value = row[index]
                if value in ex_set :
                    value = ex_set[value]
                result[name].append(value)
        
        return result
    
# CSV의 인코딩 방식을 바꾸는 함수
def change_encoding_of_csv(filepath, new_filepath, origin_encoding, target_encoding='utf-8', origin_delimiter=',', delimiter=','):
    
    with open(filepath, 'r', newline='', encoding=origin_encoding) as f_in:
        reader = csv.reader(f_in, delimiter=origin_delimiter)
        with open(new_filepath, 'w', newline='', encoding=target_encoding) as f_out:
            writer = csv.writer(f_out, delimiter=delimiter)
            for row in reader:
                writer.writerow(row)

# xlsx 파일을 csv 파일로 변환하는 함수
def xlsx_to_csv(filepath, new_filepath, sheet_name=0, delimiter=','):
    df = pd.read_excel(filepath, sheet_name=sheet_name)
    df.to_csv(new_filepath, sep=delimiter, index=False, quotechar='"', quoting=csv.QUOTE_NONNUMERIC)
