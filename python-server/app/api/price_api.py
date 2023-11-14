from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.hospital_price_service import HospitalPriceService
from app.service.clinic_price_service import ClinicPriceService

hospital_price_service = HospitalPriceService()
clinic_price_service = ClinicPriceService()


ns = Namespace('price', description='가격 정보 처리 관련 API')

@ns.route('/price/hospital/update/file')
class UpdateHospitalPriceFile(Resource):
    def get(self):
        response_data = hospital_price_service.update_hospital_price_data_file()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/hospital/update/db')
class UpdateHospitalPriceDB(Resource):
    def get(self):
        response_data = hospital_price_service.update_hospital_price_db()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/clinic/update/db/start')
class UpdatePriceDB(Resource):
    def get(self):
        response_data = clinic_price_service.start_data_collection()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/clinic/update/db/stop')
class UpdatePriceDB(Resource):
    def get(self):
        response_data = clinic_price_service.stop_data_collection()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/clinic/update/db/test/<int:nums>')
class TestUpdatePriceDB(Resource):
    def get(self, nums):
        response_data = clinic_price_service.test(nums)
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

from app import api_root
api_root.add_namespace(ns)