from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.hospital_service import HospitalService


hospital_service = HospitalService()

ns = Namespace('hospital', description='병원급 데이터 처리 관련 API')

@ns.route('/price/update/file')
class UpdateHospitalPriceFile(Resource):
    def get(self):
        response_data = hospital_service.update_hospital_data_file()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/update/db')
class UpdateHospitalPriceDB(Resource):
    def get(self):
        response_data = hospital_service.update_hospital_db()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response


from app import api_root
api_root.add_namespace(ns)