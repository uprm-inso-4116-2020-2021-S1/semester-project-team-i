from config import db

from modules.dish.dish_dao import Dish
from modules.establishment.establishment_dao import Establishment
from modules.menu.menu_dao import Menu
from modules.review.review_dao import Review
from modules.upvote.upvote_dao import UpVote
from modules.user.user_dao import User, EstablishmentUser

db.drop_all()
db.create_all()

# TODO: populate database
