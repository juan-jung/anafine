from flask import request, Response
from flask_restx import Resource, Namespace, fields
from app.util.json_util import to_json
from app.service.price_service import PriceService


price_service = PriceService()

ns = Namespace('price', description='병원급 데이터 처리 관련 API')

@ns.route('/price/update/file')
class UpdatePriceFile(Resource):
    def get(self):
        response_data = price_service.update_price_data_file()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response

@ns.route('/price/update/db')
class UpdatePriceDB(Resource):
    def get(self):
        response_data = price_service.update_price_db()
        response = Response(
            to_json(response_data), content_type='application/json; charset=utf-8')
        return response


from app import api_root
api_root.add_namespace(ns)