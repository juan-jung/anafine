from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.hospital_price_service import HospitalPriceService
from app.service.clinic_price_service import ClinicPriceService
import asyncio
from threading import Thread

hospital_price_service = HospitalPriceService()
clinic_price_service = ClinicPriceService()


ns = Namespace('price', description='가격 정보 갱신 관련 API')

def run_async_coroutine(coroutine):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(coroutine)

@ns.route('/hospital/update/file')
class UpdateHospitalPriceFile(Resource):
    def get(self):
        response_data = hospital_price_service.update_hospital_price_data_file()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/hospital/update/db')
class UpdateHospitalPriceDB(Resource):
    def get(self):
        response_data = hospital_price_service.update_hospital_price_db()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/clinic/update/db/start/<int:nums>/<string:crawling_server_url>')
class UpdatePriceDB(Resource):
    def get(self, nums, crawling_server_url):
        thread = Thread(target=run_async_coroutine, args=(clinic_price_service.start_data_collection(nums, crawling_server_url),))
        thread.start()
        
        response_data = {"message": "Data collection started in the background"}
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/clinic/update/db/stop/<string:crawling_server_url>')
class UpdatePriceDB(Resource):
    def get(self, crawling_server_url):
        response_data = clinic_price_service.stop_data_collection(crawling_server_url)
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/clinic/update/db/show_running_servers')
class UpdatePriceDB(Resource):
    def get(self):
        response_data = clinic_price_service.show_running_crwaling_server()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response


from app import api_root
api_root.add_namespace(ns)