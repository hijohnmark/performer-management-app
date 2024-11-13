from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, metadata

# Models go here!

performer_event = db.Table(
    'performers_events',
    metadata,
    db.Column('performer_id', db.Integer, db.ForeignKey(
        'performers.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey(
        'events.id'), primary_key=True)
)


# class PerformerEvent(db.Model, SerializerMixin):
#     __tablename__ = 'performers_events'

#     id = db.Column(db.Integer, primary_key=True)
#     performer_id = db.Column(db.Integer, db.ForeignKey('performers.id'))
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
#     host = db.Column(db.Boolean, default=False)

#     performer = db.relationship('Performer', back_populates='performer_events')
#     event = db.relationship('Event', back_populates='performer_events')


class Performer(db.Model, SerializerMixin):
    __tablename__ = 'performers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)
    email = db.Column(db.String)
    performer_type_id = db.Column(db.Integer, db.ForeignKey('performer_types.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    type = db.relationship('PerformerType', back_populates='performers')
    events = db.relationship('Event', secondary=performer_event, back_populates='performers')
    serialize_rules = ('-events.performers',)

    # performer_events = db.relationship('PerformerEvent', back_populates='performer')

    # events = association_proxy(
    #     'performer_events',
    #     'event',
    #     creator=lambda event_obj: PerformerEvent(event=event_obj)
    # )

    # serialize_rules = ('-performer_events', )

    def __repr__(self):
        return f'<Performer {self.id}: {self.name}, Bio: {self.bio}, Contact: {self.email}, Image URL: {self.image}>'


class PerformerType(db.Model, SerializerMixin):
    __tablename__ = 'performer_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    performers = db.relationship('Performer', back_populates='type')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-performers',)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))

    venue = db.relationship('Venue', back_populates='events')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    performers = db.relationship('Performer', secondary=performer_event, back_populates='events')
    serialize_rules = ('-performers.events',)
    # performer_events = db.relationship('PerformerEvent', back_populates='event')

    # performers = association_proxy(
    #     'performer_events',
    #     'performer',
    #     creator=lambda performer_obj: PerformerEvent(performer=performer_obj)
    # )

    # serialize_rules = ('-performer_events',)

    def __repr__(self):
        venue_name = self.venue.name if self.venue else "Unknown Venue"
        return f'<Event {self.id}: {self.name}, Date: {self.date}, Time: {self.time}, Venue: {venue_name}>'


class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    capacity = db.Column(db.Integer)

    events = db.relationship('Event', back_populates = 'venue')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-events',)

    def __repr__(self):
        return f'<Venue {self.id}: {self.name}, Address: {self.address}, Capacity: {self.capacity}>'