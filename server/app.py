#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import Performer, PerformerType, Event, Venue, performer_event

# Views go here!

class Performers(Resource):

    def get(self):

        performers = [performer.to_dict() for performer in Performer.query.all()]
        
        return make_response(
            performers,
            200
        )
    
    def post(self):
        new_performer = Performer(
            name=request.json["name"],
            image=request.json["image"],
            bio=request.json["bio"],
            email=request.json["email"],
            performer_type_id=request.json["performer_type_id"],
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

class PerformerTypes(Resource):
    def get(self):
        performer_types = [performer_type.to_dict() for performer_type in PerformerType.query.all()]

        return make_response(
            performer_types,
            200
        )

api.add_resource(PerformerTypes, '/performer_types')


class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]

        return make_response(
            events,
            200
        )
    
    def post(self):

        date_str = request.json["date"]
        time_str = request.json["time"]

        date = datetime.strptime(date_str, "%Y-%m-%d").date() if date_str else None
        time = datetime.strptime(time_str, "%H:%M").time() if time_str else None

        new_event = Event(
            name=request.json["name"],
            date=date,
            time=time,
            venue_id=request.json["venue_id"],
        )

        db.session.add(new_event)
        db.session.flush()
        
        performer_events = []
        performer_ids = request.json["performer_ids"]
        host = request.json["host"]

        def is_host(id):
            if id == host:
                return 1
            else:
                return 0


        for id in performer_ids:
            performer_events.append({
                'performer_id': id,
                'event_id': new_event.id,
                'host': is_host(id)
            })
        
        print(performer_events)
        
        db.session.execute(performer_event.insert(), performer_events)
        db.session.commit()
        

        response_dict = new_event.to_dict()

        return make_response(
            response_dict,
            201
        )
    
api.add_resource(Events, "/events")

class Venues(Resource):
    
    def get(self):
        venues = [venue.to_dict() for venue in Venue.query.all()]

        return make_response(
            venues,
            200
        )
    
    def post(self):
        new_venue = Venue(
            name=request.json["name"],
            address=request.json["address"],
            capacity=request.json["capacity"],
        )

        db.session.add(new_venue)
        db.session.commit()

        response_dict = new_venue.to_dict()

        return make_response(
            response_dict,
            201
        )

api.add_resource(Venues, "/venues")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

