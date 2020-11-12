from flask import request, jsonify

from config import app
from modules.establishment.establishment_controller import EstablishmentController
from modules.user.user_controller import UserController


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/users', methods=['GET', 'POST'])
def get_all_or_create_users():
    if request.method == 'GET':
        return UserController.get_all_users()
    elif request.method == 'POST':
        return UserController.create_user(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_or_update_or_delete_user(id):
    if request.method == 'GET':
        return UserController.get_user_by_id(id)
    elif request.method == 'PUT':
        return UserController.update_user(id, request.json)
    elif request.method == 'DELETE':
        return UserController.delete_user(id)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/establishments', methods=['GET', 'POST'])
def get_all_or_create_establishments():
    if request.method == 'GET':
        return EstablishmentController.get_all_establishments()
    elif request.method == 'POST':
        return EstablishmentController.create_establishment(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


if __name__ == '__main__':
    app.run()
