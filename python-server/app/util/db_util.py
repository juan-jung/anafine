from app.util.csv_util import get_values_from_csv
from app.domain import Session
import app.domain.entity as entity

#FIXME:service로 변경 필요
#TODO : csv파일이 없는 경우 구글드라이브에서 다운 받아서 사용하는 코드 작성 - 이를 위해 json에 구글드라이브 id값 저장 필요
csv_paths = []
table_names = []
csv_columns = dict()
db_columns = dict()


name = "Category"
csv_paths.append("resource/data/db_base/category.csv")
table_names.append(name)
csv_columns[name] = ["category_id", "parent_id","name", "info", "isLeaf"] 
db_columns[name] = ["category_id", "parent_category_id","name", "info", "isleaf"]

name = "Treatment"
csv_paths.append("resource/data/db_base/treatment.csv")
table_names.append(name)
csv_columns[name] = ["treatment_id", "category_id", "name", "info", "path"]
db_columns[name] = ["treatment_id", "category_id", "name", "info", "path"]

name = "HospitalType"
csv_paths.append("resource/data/db_base/hospital_type.csv")
table_names.append(name)
csv_columns[name] = ["hospital_type_id", "name"]
db_columns[name] = ["hospital_type_id", "name"]

name = "Hospital"
csv_paths.append("resource/data/db_base/hospital.csv")
table_names.append(name)
csv_columns[name] = ["종별코드", "암호화요양기호", "요양기관명", "주소", "좌표(X)", "좌표(Y)", "전화번호","병원홈페이지"]
db_columns[name] = ["hospital_type_id", "ykiho", "name", "address", "latitude", "longitude", "tel", "homepage_url"]


def init_db_base():
    session = Session()
    for csv_path, table_name in zip(csv_paths, table_names) :
        db_values = get_values_from_csv(csv_path, csv_columns[table_name], db_columns[table_name])
        rows_number = len(db_values[db_columns[table_name][0]])
        for i in range(rows_number) :
            options = dict()
            for column_name, value in db_values.items() :
                options[column_name] = value[i]
            new_entity = entity.__dict__[table_name](**options)
            session.add(new_entity)
            session.flush()
        session.commit()
        print(table_name, " session commited")
    session.close()
