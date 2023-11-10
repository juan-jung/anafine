from flask import request, jsonify, Response
from flask_restx import Resource, Namespace, fields
from app.service.chatbot_service import ChatService

ns = Namespace('chat', description='챗봇 API')

chatbot = ChatService()

content_item = ns.model('UserInput', {
    'sex': fields.String(required=True, description='성별'),
    'age': fields.String(required=True, description='나이'),
    'pain_area': fields.String(required=True, description='아픈 부위'),
    'symptoms': fields.String(required=True, description='증상')
})


@ns.route('/chatbot')
class HealthAnalysis(Resource):
    @ns.expect(content_item)
    def post(self):
        data = request.json
        response_data = chatbot.play_chat(data)
        return jsonify(response_data)


from app import api_root
api_root.add_namespace(ns)