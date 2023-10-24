from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.clinic_service import ClinicService


clinic_service = ClinicService()

ns = Namespace('clinic', description='의원급 데이터 처리 관련 API')

@ns.route('/check/state')
class Keyword(Resource):
    def get(self):
        response_data = "OK"
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response



from app import api_root
api_root.add_namespace(ns)