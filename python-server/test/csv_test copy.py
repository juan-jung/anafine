from dataclasses import dataclass, asdict

@dataclass
class CsvInfo:
    csv_path: str
    entity_name: str
    csv_columns: list
    db_columns: list
    
#CsvInfos인 json 파일 만들기
csv_infos = []
csv_infos.append(CsvInfo("res/db_base/treatment.csv", "Treatment", ["treatment_id", "category_id", "name", "info", "path"], ["treatment_id", "category_id", "name", "info", "path"]))
csv_infos.append(CsvInfo("res/db_base/category.csv", "Category", ["category_id", "parent_id","name", "info", "isLeaf"], ["category_id", "parent_category_id","name", "info", "isleaf"]))
csv_infos.append(CsvInfo("res/db_base/hospital_type.csv", "HospitalType", ["hospital_type_id", "name"], ["hospital_type_id", "name"]))
csv_infos.append(CsvInfo("res/db_base/hospital.csv", "Hospital", ["종별코드", "암호화요양기호", "요양기관명", "주소", "좌표(X)", "좌표(Y)", "전화번호","병원홈페이지"], ["hospital_type_id", "ykiho", "name", "address", "latitude", "longitude", "tel", "homepage_url"]))

csv_infos_dict_list = [asdict(info) for info in csv_infos]

#csv_infos를 json 파일로 만들기
import json
with open("res/db_base/csv_infos.json", "w", encoding="utf-8") as f:
    json.dump(csv_infos_dict_list, f, ensure_ascii=False, indent=4)