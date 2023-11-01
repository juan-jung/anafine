import os
FILE_OVERWRITE = os.environ.get('FILE_OVERWRITE') in set(['True', 'true', "TRUE", '1'])

def initialize():
    from app.domain import Base, engine
    ddl_auto = os.environ.get('DB_DDL_AUTO')
    if ddl_auto == "none":
        #아무것도 하지 않음
        pass
    elif ddl_auto == "validate":
        #제공하지 않는 기능 none과 동일하게 처리
        pass
    elif ddl_auto == "update":
        Base.metadata.create_all(engine)
    elif ddl_auto == "create":
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
        
        from app.initializer.db_initializer import init_db_base
        init_db_base()
        
        from app.service.price_service import PriceService, final_file_path as price_file_path
        price_service = PriceService()
        
        if FILE_OVERWRITE or not os.path.exists(price_file_path):
            price_service.update_price_data_file()
            
        price_service.update_price_db()