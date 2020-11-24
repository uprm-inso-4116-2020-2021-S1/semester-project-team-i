# import enum

from config import db
from helpers.mixin import DaoOperations, OutputMixin


# class DishType(enum):
#     one = "Appetizer"
#     two = "Entree"
#     three = "Dessert"
#     four = "Drink"


class Dish(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    DISH_REQUIRED_PARAMS = ['description', 'price', 'category', 'name',
                            'type', 'establishment_id', 'category_id']

    did = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    rating = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(250), default='')
    category_id = db.Column(db.Integer, db.ForeignKey('category.cid'), nullable=False)
    category = db.relationship('Category', backref='dishes', lazy=True)     # int? | Category table
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    establishment_id = db.Column(db.Integer, db.ForeignKey('establishment.eid'), nullable=False)
    establishment = db.relationship('Establishment', backref='dishes', lazy=True)

    def __init__(self, **kwargs):
        super(Dish, self).__init__(**kwargs)
        self.description = kwargs['description']
        self.price = kwargs['price']
        self.image_url = kwargs.get('image_url', None)
        self.rating = kwargs.get('rating', None)
        self.name = kwargs['name']
        self.type = kwargs['type']
        self.establishment_id = kwargs['establishment_id']
        self.category_id = kwargs['category_id']

    @staticmethod
    def get_all_dishes():
        return Dish.query.all()

    @staticmethod
    def get_dish_by_id(dish_id):
        return Dish.query.filter_by(did=dish_id).first()

    # new queries
    @staticmethod
    def get_all_dish_by_type(dish_type):
        return Dish.query.filter_by(type=dish_type)

    @staticmethod
    def get_all_dish_by_category(dish_category):
        return Dish.query.filter_by(category=dish_category)

    @staticmethod
    def get_all_dishes_by_establishment(eid):
        return Dish.query.filter_by(establishment_id=eid)

    @staticmethod
    def get_top_dishes_by_establishment(eid, n=3):
        return Dish.query.filter_by(establishment_id=eid).\
            order_by(Dish.rating.desc()).limit(n)

    @staticmethod
    def get_top_dishes(n=100):
        return Dish.query.order_by(Dish.rating.desc()).limit(n)
