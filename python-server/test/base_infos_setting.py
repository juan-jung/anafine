from dataclasses import dataclass
import dotenv
dotenv.load_dotenv(dotenv_path="../.env", verbose=True) #환경변수 로드
import os


@dataclass
class EntityInfo:
    entity_name: str
    file_name: str
    file_drive_id: str
    csv_to_db_column_map: dict()
    
def write_base_infos_file():
    csv_names = []
    table_names = []
    csv_columns = dict()
    db_columns = dict()
    
    name = "Category" ## 이건 직접 만드는 데이터
    csv_names.append("category.csv")
    table_names.append(name)
    csv_columns[name] = ["category_id", "parent_id","name", "info", "isLeaf"] 
    db_columns[name] = ["category_id", "parent_category_id","name", "info", "is_leaf"]

    name = "Treatment"
    csv_names.append("treatment.csv")
    table_names.append(name)
    csv_columns[name] = ["treatment_id", "category_id", "name", "info", "path"]
    db_columns[name] = ["treatment_id", "category_id", "name", "info", "path"]

    name = "HospitalType"
    csv_names.append("hospital_type.csv")
    table_names.append(name)
    csv_columns[name] = ["hospital_type_id", "name"]
    db_columns[name] = ["hospital_type_id", "name"]

    name = "Hospital"
    csv_names.append("hospital.csv")
    table_names.append(name)
    csv_columns[name] = ["종별코드", "암호화요양기호", "요양기관명", "주소", "좌표(X)", "좌표(Y)", "전화번호","병원홈페이지"]
    db_columns[name] = ["hospital_type_id", "ykiho", "name", "address", "longitude", "latitude", "tel", "homepage_url"]
    
    base_infos = []
    for csv_name, table_name in zip(csv_names, table_names):
        csv_columns_for_me = csv_columns[table_name]
        db_columns_for_me = db_columns[table_name]
        entity = EntityInfo(table_name, csv_name, os.environ.get(f'{csv_name.replace(".csv","").upper()}_FILE_DRIVE_ID'), dict(zip(csv_columns_for_me, db_columns_for_me)))
        base_infos.append(entity)
    
    import json
    base_directory = 'resource/data/db_base'
    base_infos_path = f'{base_directory}/base_infos.json'
    
    #directory가 없으면 생성
    if not os.path.isdir(base_directory):
        os.makedirs(base_directory)

    with open(base_infos_path, 'w', encoding='utf-8') as f:
        json.dump([base_info.__dict__ for base_info in base_infos], f, ensure_ascii=False, indent=4)
        
if __name__ == "__main__":
    write_base_infos_file()