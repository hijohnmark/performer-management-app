from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Performer(db.Model, SerializerMixin):
    __tablname__ = 'performers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)
    email = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f'Performer {self.id}: {self.name}, Bio: {self.bio}, Contact: {self.email}, Image URL: {self.image}'
    
