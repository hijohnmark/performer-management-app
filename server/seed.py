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
        "https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/464187936_984906036983506_8033087804017152469_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=gokRPONIMXsQ7kNvgGCu5ce&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=A85opqK3fKiBka9n_k0bxqa&oh=00_AYDfCFnZEAobJaroIz0TcDUC6OBoYyNKmXxaD7lWFFR9RQ&oe=673B8939",
        "https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/464203217_984906900316753_3606753934579104904_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nAI2MR48DVAQ7kNvgGaHOI2&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=AaUWigwrpuEMphsKQ_9W0P_&oh=00_AYBCcxi9cv5tUpa9sJMjYWluKGPQKwrxI3BDhvlAV9ApuA&oe=673B89FE",
        "https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/463749775_983224437151666_8292857059205273849_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xIV3XXL8xnkQ7kNvgEiru3H&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=AQyXIGZG81nGAUf0M7ngJIu&oh=00_AYCQ9zXPV3y_0pvJX1HmmsvN5hJ2q656PMl54RJ9HFHLrA&oe=673B7F95",
        "https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/464415045_987655613375215_244135096885973262_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ciL5VxFj8LwQ7kNvgGjuyeu&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=AOPK1MNSPf39ts6riEzLhWL&oh=00_AYCMzdnBicJkgCWqu4F5JmqrwTTCUU2PGhMi1NrnpIDYtg&oe=673B8722",
        "https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/459844365_959321792875264_603798176134569687_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ji2-bDUzegYQ7kNvgEHF2ya&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=AEiFRT4LEMoZymaOf7TeeEE&oh=00_AYCy9gRvaE9HGP1tM3F_NU08Cu60SJxIt2kWzT7y4eE-Qw&oe=673B8AD5"
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

        for performer in selected_performers:
            performer_events.append({'performer_id': performer.id, 'event_id': event.id, 'host':fake.boolean()})
    
    db.session.execute(performer_event.insert(), performer_events)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_performer_types()
        make_performers()
        make_venues()
        make_events()
        make_performer_events()