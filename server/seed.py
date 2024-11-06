#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Performer
from config import db

fake = Faker()

def make_performers():

    Performer.query.delete()

    performers = []

    for i in range(10):
        performer = Performer(
            name = fake.name(),
            bio = fake.text(),
            contact_info = fake.email()
        )
        performers.append(performer)

    db.session.add_all(performers)
    db.session.commit()
    
if __name__ == '__main__':
    with app.app_context():
        make_performers()

