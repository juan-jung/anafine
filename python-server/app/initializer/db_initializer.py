from app.util.csv_util import get_values_from_csv
from app.util.json_util import load_json_from_file
from app.util.google_drive_util import download_from_google_drive
from app.domain import Session
import app.domain.entity as entity
import os
from dataclasses import dataclass


@dataclass
class EntityInfo:
    entity_name: str
    file_name: str
    file_drive_id: str
    csv_to_db_column_map: dict()


base_directory = 'resource/data/db_base'
BASE_INFOS_FILE_DRIVE_ID = os.environ.get('BASE_INFOS_FILE_DRIVE_ID')
FILE_OVERWRITE = os.environ.get('FILE_OVERWRITE') in set(['True', 'true','TRUE', '1'])
def init_db_base():
    
    #base_infos 파일을 받아와서 csv 파일들의 mapping과 base 파일들의 구글드라이브 id를 저장
    base_infos_path = f'{base_directory}/base_infos.json'
    download_from_google_drive(base_infos_path, BASE_INFOS_FILE_DRIVE_ID, overwrite = FILE_OVERWRITE)
    
    base_infos = []
    for base_info in load_json_from_file(base_infos_path):
        base_infos.append(EntityInfo(**base_info))
    
    session = Session()
    for base_info in base_infos:
        file_path = f'{base_directory}/{base_info.file_name}'
        download_from_google_drive(file_path, base_info.file_drive_id, overwrite = FILE_OVERWRITE)
        db_value_map = get_values_from_csv(file_path, base_info.csv_to_db_column_map.keys(), base_info.csv_to_db_column_map.values())
        rows_number = len(db_value_map.values().__iter__().__next__())
        for row in range(rows_number) :
            options = dict()
            for column_name, column_value in db_value_map.items() :
                options.update({column_name:column_value[row]})
            new_entity = entity.__dict__[base_info.entity_name](**options)
            try:
                session.add(new_entity)
            except Exception as e:
                session.flush()
                session.add(new_entity)

        session.commit()
        print(base_info.entity_name, " session commited")
    session.close()
    



