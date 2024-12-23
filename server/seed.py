#!/usr/bin/env python3

# Standard library imports
from random import sample, randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Performer, PerformerType, Event, Venue, performer_event
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
        "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,h_128,dpr_3/https://assets.app.engoo.com/images/5lD7576cnWqkSq3HyBc7VK.jpeg",
        "https://media.gettyimages.com/id/471730013/photo/circus-hoop-performer.jpg?s=612x612&w=gi&k=20&c=A1804TqpjVoRwhbSrTIkCJpNg58jqHu6XzeZwKkb7rY=",
        "https://image.cnbcfm.com/api/v1/image/106043565-genie-michaeljamesscott_carbon.jpg?v=1564174882&w=750&h=422&vtcrop=y",
        "https://t3.ftcdn.net/jpg/03/26/52/14/360_F_326521465_d3Lv3za5GEGqYAR3M8bem2mHY1vjvmJP.jpg",
        "https://media.istockphoto.com/id/1373255503/photo/magician-hands-showing-magic-trick.jpg?s=612x612&w=0&k=20&c=Ka8puF2fx73M7-6EGH-tF5Bgg4IyrcR9Ms3k5koc4ek="
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
        for i in range(6):
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

def make_performer_events():
    db.session.execute(performer_event.delete())

    performers = Performer.query.all()
    events = Event.query.all()

    performer_events = []

    for event in events:
        num_performers = randint(1, len(performers))
        selected_performers = sample(performers, num_performers)

        host_performer = rc(selected_performers)

        for performer in selected_performers:
            performer_events.append({
                'performer_id': performer.id,
                'event_id': event.id,
                'host': performer == host_performer
            })
    
    db.session.execute(performer_event.insert(), performer_events)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_performer_types()
        make_performers()
        make_venues()
        make_events()
        make_performer_events()