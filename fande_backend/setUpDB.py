from config import db

<<<<<<< HEAD
# from modules.menu.menu_dao import Menu
# from modules.dish.dish_dao import Dish
=======
from modules.menu.menu_dao import Menu
from modules.dish.dish_dao import Dish
>>>>>>> 8eab2a48a5eb2d180f82105b6fe7ab5c0d8a5bb0
from modules.establishment.establishment_dao import Establishment
from modules.user.user_dao import User
# from modules.review.review_dao import Review
# from modules.upvote.upvote_dao import UpVote

db.drop_all()
db.create_all()

# TODO: populate database
