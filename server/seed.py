#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Performer, PerformerType, Event, Venue
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
    performer_types = PerformerType.query.all()
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
            performer_type_id = rc(performer_types).id
        )
        performers.append(performer)

    db.session.add_all(performers)
    db.session.commit()

def make_venues():

    Venue.query.delete()
    venue_data = [
        {'name': 'The Observatory', 'capacity': 600, 'address': '85 Cach Mang Thang Tam, Q1'},
        {'name': 'Shout Bar', 'capacity': 300, 'address': '69 Nguyen Cu, Thao Dien'},
        {'name': 'Les Stagiares', 'capacity': 250, 'address': '10 Duong So 54, Thao Dien'},
        {'name': 'Twist Cafe', 'capacity': 100, 'address': '88 Xuan Thuy, Thao Dien'},
        {'name': 'Arcan', 'capacity': 700, 'address': '29/2H Dien Bien Phu, Binh Thanh'}
    ]
    venues = []

    for data in venue_data:
        venue = Venue(
            name = data['name'],
            address = data['address'],
            capacity = data['capacity']
        )
        venues.append(venue)

    db.session.add_all(venues)
    db.session.commit()


def make_events():

    Event.query.delete()

    events = []
    venues = Venue.query.all()

    if venues:
        for i in range(5):
            event = Event(
                name = ' '.join(fake.words(6)),
                date = datetime.strptime(fake.date_between(start_date="today", end_date="+731d").strftime('%Y-%m-%d'), '%Y-%m-%d').date(),                
                time = datetime.strptime(fake.time()[:5], '%H:%M').time(),
                venue_id = rc(venues).id
            )
            events.append(event)
    else:
        print("No venues found. Skipping event seeding.")

    db.session.add_all(events)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_performer_types()
        make_performers()
        make_venues()
        make_events()


