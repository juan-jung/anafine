from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from dotenv import load_dotenv

#TODO: config 파일 분리해서 os.environ.get 가져오도록 설정하기
def create_app():
    global api_root
    print("create_app실행")
    load_dotenv(verbose=True) #환경변수 로드
    app = Flask(__name__)
    CORS(app)
    api_root = Api(app, version='0.1.0 alpha', title="anafine's Python Server", description="anafine's Python Server", doc='/')
    from . import api
    initialize()
    return app


def initialize():
    import os
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
        from app.util.db_util import init_db_base
        init_db_base()
        from app.service.price_service import PriceService
        price_service = PriceService()
        price_service.update_price_data_file()
        price_service.update_price_db()
