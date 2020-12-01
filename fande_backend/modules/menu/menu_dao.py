from config import db
from helpers.mixin import OutputMixin, DaoOperations


class Menu(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    MENU_REQUIRED_PARAMS = ['name', ]

    mid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, **kwargs):
        self.name = kwargs['name']

    @staticmethod
    def get_all_menus():
        return Menu.query.all()

    @staticmethod
    def get_menu_by_id(menu_id):
        return Menu.query.filter_by(mid=menu_id).first()

#    #verifies if the menu has a particular dish
#     @staticmethod
#     def verify_dish_in_menu(dish_name):
#         obj = Menu.query.filter(Menu.dishes == dish_name).first()
#         return True if obj else False
