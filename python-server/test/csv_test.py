import csv

# CSV의 인코딩 방식을 바꾸는 함수
def change_encoding_of_csv(filepath, new_filepath, origin_encoding, target_encoding='utf-8', origin_delimiter=',', delimiter=','):
    with open(filepath, 'r', newline='', encoding=origin_encoding) as f_in:
        reader = csv.reader(f_in, delimiter=origin_delimiter)
        with open(new_filepath, 'w', newline='', encoding=target_encoding) as f_out:
            writer = csv.writer(f_out, delimiter=delimiter)
            for row in reader:
                writer.writerow(row)

# xlxs 파일을 csv 파일로 변환하는 함수
import pandas as pd
def xlsx_to_csv(filepath, new_filepath, sheet_name=0, delimiter=','):
    df = pd.read_excel(filepath, sheet_name=sheet_name)
    df.to_csv(new_filepath, sep=delimiter, index=False, quotechar='"', quoting=csv.QUOTE_NONNUMERIC)


if __name__ == '__main__':
    xlsx_to_csv("res/병원정보.xlsx", "res/db_base/hospital.csv")
    print("hospital.csv done")
    xlsx_to_csv("res/병원카테고리.xlsx", "res/db_base/hospital_type.csv")
    print("hospital_type.csv done")
    change_encoding_of_csv("res/비급여테이블.csv", "res/db_base/treatment.csv", "euc-kr")
    print("treatment.csv done")
    change_encoding_of_csv("res/카테고리테이블.csv", "res/db_base/category.csv", "euc-kr")
    print("category.csv done")