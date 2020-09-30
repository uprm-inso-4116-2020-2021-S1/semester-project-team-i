from os import environ

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


DEV_DB = 'postgresql://insouser:inso4116@localhost/FindAndEat'
app = Flask(__name__)
app.secret_key = "inso_secret_key"

if 'DATABASE_URL' in environ:
    app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URL']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB

db = SQLAlchemy(app)
CORS(app)
