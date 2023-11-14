from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from dotenv import load_dotenv

#TODO: config 파일 분리해서 os.environ.get 가져오도록 설정하기
def create_app():
    global api_root
    load_dotenv(verbose=True) #환경변수 로드
    app = Flask(__name__)
    CORS(app)
    api_root = Api(app, version='0.1.0 alpha', title="anafine's Python ChatBot Server", description="anafine's Python ChatBot Server", doc='/')
    from . import api
    return app
