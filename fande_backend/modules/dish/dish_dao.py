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
                            'type', 'menu_id']

    did = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    rating = db.Column(db.Integer)
    image_url = db.Column(db.String(250))
    category = db.Column(db.String(50), nullable=False)     # int? | Category table
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.mid'), nullable=False)
    menu = db.relationship('Menu', backref='dishes', lazy=True)
    # upVotes = db.relationship('UpVote', backref=db.backref('dish', lazy='subquery'), lazy=True)
    # reviews = db.relationship('Review', backref=db.backref('dish', lazy='subquery'), lazy=True)

    def __init__(self, **kwargs):
        super(Dish, self).__init__(**kwargs)
        self.description = kwargs['description']
        self.price = kwargs['price']
        self.image_url = kwargs.get('image_url', None)
        self.rating = kwargs.get('rating', None)
        self.name = kwargs['name']
        self.type = kwargs['type']
        self.menu_id = kwargs['menu_id']
        self.category = kwargs['category']

    @staticmethod
    def get_all_dishes():
        return Dish.query.all()

    @staticmethod
    def get_dish_by_id(dish_id):
        return Dish.query.filter_by(did=dish_id).first()


    @staticmethod
    def get_all_dish_by_type(dish_type):
        return Dish.query.filter_by(type=dish_type)

    @staticmethod
    def get_all_dish_by_category(dish_category):
        return Dish.query.filter_by(category=dish_category)