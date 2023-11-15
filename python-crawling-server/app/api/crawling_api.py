from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.crawling_service import CrawlingService
import json

crawling_service = CrawlingService()

ns = Namespace('crawl', description='크롤링 API')

hospital_model = ns.model('HospitalInfo', {
    'hospital_id': fields.String(required=True, description='병원 ID'),
    'hospital_name': fields.String(required=True, description='병원명'),
    'hospital_address': fields.String(required=True, description='주소')
})

@ns.route('/hira')
class UpdateHospitalPriceFile(Resource):
    @ns.expect([hospital_model])
    def post(self):
        try :
            request_data = json.loads(request.json)
        except :
            request_data = request.json
        response_data = crawling_service.crawl_hira(request_data)
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response



from app import api_root
api_root.add_namespace(ns)