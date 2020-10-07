from config import db

from dao.dish import Dish
from dao.menu import Menu
from dao.user import User, EstablishmentUser
from dao.establishment import Establishment
from dao.review import Review
from dao.upvote import UpVote


db.drop_all()
db.create_all()

# TODO: populate database
