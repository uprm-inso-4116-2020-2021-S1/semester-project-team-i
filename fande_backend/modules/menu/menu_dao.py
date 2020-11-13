from config import db
from helpers.mixin import OutputMixin, DaoOperations


class Menu(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    mid = db.Column(db.Integer, primary_key=True)
    establishments = db.relationship('Establishment', uselist=False, backref='menu', lazy=True)
    dishes = db.relationship('Dish', backref='menu', lazy=True)


    def __init__(self, **kwargs):
        super(Menu, self).__init__(**kwargs)
        self.establishments = kwargs['establishments']
        self.dishes = kwargs['dishes']


    @staticmethod
    def get_all_menu():
        return Menu.query.all()

    @staticmethod
    def get_menu_by_id(menu_id):
        return Menu.query.filter_by(mid=menu_id).first()

   #verifies if the menu has a particular dish
    @staticmethod
    def verify_dish_in_menu(dish_name):
        obj = Menu.query.filter(Menu.dishes == dish_name).first()
        return True if obj else False

