# import enum

from config import db
from helpers.mixin import OutputMixin, DaoOperations


# class DishCategory(enum):
#     CHICKEN = "Chicken"
#     RED_MEAT = "Red meat"
#     FISH = "Fish"
#     LAMB = "Lamb"
#     PORK = "Pork"
#     CRUSTACEAN = "Crustacean"
#     SUSHI = "Sushi"
#     PASTA = "Pasta"
#     NOODLES = "Noodles"
#     BURGER = "Burger"
#     SANDWSHES = "Sandwishes"
#     PIZZA = "Pizza"
#     PASTA = "Pasta"
#     TACO = "Taco"
#     KEBAB = "Kebab"
#     WRAPS = "wWaps"
#     SOUP = "Soup"
#     FRIED_FOOD = "Fried food"
#     CURRY = "Curry"
#     STEW = "Stew"
#     BBQ = "BBQ"
#     BREAD = "Bread"
#     CHEESE = "Cheese"
#     DOUGHNUT = "Doughnut"
#     MUFFIN = "Muffin"
#     CAKE = "Cake"
#     PIE = "Pie"
#     COOKIES = "Cookies"
#     PASTRIES = "Pastries"
#     PRETZEL = "Pretzel"
#     CHEESE_CAKE = "Cheese cake"
#     ICE_CREAM = "Ice cream"
#     AMERICAN = "American"
#     VIETNAMESE = "Vietnamese"
#     KOREAN = "Korean"
#     SPANISH = "Spanish"
#     THAI = "Thai"
#     ARABIC = "Arabic"
#     ETHIOPIAN = "Ethiopian"
#     INDIAN = "Indian"
#     TURKISH = "Turkish"
#     ITALIAN = "Italian"
#     CHINESE = "Chinese"
#     JAPANESE = "Japanese"
#     MEXICAN = "Mexican"
#     CRIOLLO = "Criollo"
#     LEGUMES = "Legumes"
#     VEGETARIAN = "Vegetarian"
#     VEGAN = "Vegan"


class Category(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    CATEGORY_REQUIRED_PARAMS = ['name']
    cid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, **kwargs):
        super(Category, self).__init__(**kwargs)
        self.name = kwargs['name']

    @staticmethod
    def get_all_categories():
        return Category.query.all()

    @staticmethod
    def get_category_by_id(category_id):
        return Category.query.filter_by(cid=category_id).first()
