#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Performer, PerformerType
from config import db

fake = Faker()
performer_types = []

def make_performer_types():
    
    PerformerType.query.delete()

    types = ["drag artist", "drag king", "drag queen", "musician", "magician", "dj"]

    for i, type in enumerate(types):
        performer_type = PerformerType(
            name = type
        )
        performer_types.append(performer_type)

    db.session.add_all(performer_types)
    db.session.commit()


def make_performers():

    Performer.query.delete()

    performers = []
    img_urls = [
        "https://shorturl.at/ReCnj",
        "https://shorturl.at/eTxmF",
        "https://shorturl.at/RY8gp",
        "https://shorturl.at/fNv0c",
        "https://shorturl.at/3lz0q"
    ]

    for i, img_url in enumerate(img_urls):
        performer = Performer(
            name = fake.name(),
            image = img_url,
            bio = fake.text(),
            email = fake.email(),
            performer_type_id = randint(1, len(PerformerType.query.all()))
        )
        performers.append(performer)

    db.session.add_all(performers)
    db.session.commit()
    
if __name__ == '__main__':
    with app.app_context():
        make_performer_types()
        make_performers()


