from config import db


from modules.dish.dish_dao import Dish
from modules.category.category_dao import Category, create_categories
from modules.establishment.establishment_dao import Establishment
from modules.user.user_dao import User
from modules.review.review_dao import Review
from modules.upvote.upvote_dao import UpVote

db.drop_all()
db.create_all()

create_categories()
