import enum

from config import db
from helpers.mixin import DaoOperations, OutputMixin


class DishType(enum):
    appetizer = "Appetizer"
    entree = "Entree"
    dessert = "Dessert"
    drink = "Drink"


class Dish(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    did = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    rating = db.Column(db.Integer)
    image_url = db.Column(db.String(250))
    category = db.Column(db.String(50))     # int? | Category table
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    mid = db.Column(db.Integer, db.ForeignKey('menu.mid'), nullable=False)
    # upVotes = db.relationship('UpVote', backref=db.backref('dish', lazy='subquery'), lazy=True)
    # reviews = db.relationship('Review', backref=db.backref('dish', lazy='subquery'), lazy=True)
    # menu = db.relationship('Menu')

    def __init__(self, **kwargs):
        super(Dish, self).__init__(**kwargs)
        self.description = kwargs['description']
        self.price = kwargs['price']
        # self.rating = kwargs['rating']
        # self.image_url = kwargs['image_url']
        self.name = kwargs['name']
        self.type = kwargs['type']
