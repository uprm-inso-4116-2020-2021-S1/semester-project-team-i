import enum

from config import db
from helpers.mixin import DaoOperations, OutputMixin


class DishType(enum):
    appetizer = "Appetizer"
    entree = "Entree"
    dessert = "Dessert"
    drink = "Drink"

class DishCategory(enum):
    CHICKEN = "Chicken"
    RED_MEAT = "Red meat"
    FISH = "Fish"
    LAMB = "Lamb"
    PORK = "Pork"
    CRUSTACEAN = "Crustacean"
    SUSHI = "Sushi"
    PASTA = "Pasta"
    NOODLES = "Noodles"
    BURGER = "Burger"
    SANDWSHES = "Sandwishes"
    PIZZA = "Pizza"
    PASTA = "Pasta"
    TACO = "Taco"
    KEBAB = "Kebab"
    WRAPS = "wWaps"
    SOUP = "Soup"
    FRIED_FOOD = "Fried food"
    CURRY = "Curry"
    STEW = "Stew"
    BBQ = "BBQ"
    BREAD = "Bread"
    CHEESE = "Cheese"
    DOUGHNUT = "Doughnut"
    MUFFIN = "Muffin"
    CAKE = "Cake"
    PIE = "Pie"
    COOKIES = "Cookies"
    PASTRIES = "Pastries"
    PRETZEL = "Pretzel"
    CHEESE_CAKE = "Cheese cake"
    ICE_CREAM = "Ice cream"
    AMERICAN = "American"
    VIETNAMESE = "Vietnamese"
    KOREAN = "Korean"
    SPANISH = "Spanish"
    THAI = "Thai"
    ARABIC = "Arabic"
    ETHIOPIAN = "Ethiopian" 
    INDIAN = "Indian"
    TURKISH = "Turkish"
    ITALIAN = "Italian"
    CHINESE = "Chinese"
    JAPANESE = "Japanese"
    MEXICAN = "Mexican"
    CRIOLLO = "Criollo"
    LEGUMES = "Legumes" # esto son las viandas y cosas asi que no solamente vegetales
    VEGETARIAN = "Vegetarian"
    VEGAN = "Vegan"



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
        # entiendo que estos 2 se deberia de hacer con lo de kwargs.get()
        self.name = kwargs['name']
        self.type = kwargs['type']

    @staticmethod
    def get_all_dishes():
        return Dish.query.all()

    @staticmethod
    def get_dish_by_id(dish_id):
        return Dish.query.filter_by(did=dish_id).first()

    @staticmethod
    def get_all_dish_in_a_category(d_category):
        return Dish.query.filter_by(category=d_category)

    @staticmethod
    def get_all_dish_of_a_type(d_type):
        return Dish.query.filter_by(type=d_type)
    #no estoy seguro de que este funcione pero creo que si
    @staticmethod
    def get_dish_category_and_type(dish_name):
        obj = Dish.query.filter_by(name=dish_name).first
        result = [obj.category, obj.type]
        return result