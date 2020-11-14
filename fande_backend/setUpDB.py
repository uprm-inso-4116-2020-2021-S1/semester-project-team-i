from config import db

from modules.menu.menu_dao import Menu
from modules.dish.dish_dao import Dish
from modules.category.category_dao import Category
from modules.establishment.establishment_dao import Establishment
from modules.user.user_dao import User
# from modules.review.review_dao import Review
# from modules.upvote.upvote_dao import UpVote

db.drop_all()
db.create_all()

# TODO: populate database
