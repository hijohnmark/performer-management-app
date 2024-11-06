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

@app.route('/')
def index():
    performers = [performer.to_dict() for performer in Performer.query.all()]
    return make_response(
        jsonify(performers),
        200
    )


if __name__ == '__main__':
    app.run(port=5555, debug=True)

