#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Performer

# Views go here!

class Performers(Resource):

    def get(self):

        performers = [performer.to_dict() for performer in Performer.query.all()]
        
        return make_response(
            jsonify(performers),
            200
        )
    
    def post(self):
        new_performer = Performer(
            name=request.json["name"],
            image=request.json["image"],
            bio=request.json["bio"],
            email=request.json["email"],
        )

        db.session.add(new_performer)
        db.session.commit()

        response_dict = new_performer.to_dict()

        return make_response(
            response_dict,
            201
        )

api.add_resource(Performers, '/performers')

class PerformerById(Resource):

    def delete(self, id):

        performer = Performer.query.filter(Performer.id == id).first()

        db.session.delete(performer)
        db.session.commit()

        response_dict = {"message": "Performer successfully deleted."}

        return make_response(
            response_dict,
            200
        )
    
    def patch(self, id):

        performer = Performer.query.filter(Performer.id == id).first()
        for attr in request.json:
            setattr(performer, attr, request.json[attr])

        db.session.add(performer)
        db.session.commit()

        response_dict = performer.to_dict()

        return make_response(
            response_dict,
            200
        )

api.add_resource(PerformerById, '/performers/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

