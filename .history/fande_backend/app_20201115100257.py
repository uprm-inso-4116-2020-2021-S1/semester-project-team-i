from flask import request, jsonify

from config import app
from modules.dish.dish_controller import DishController
from modules.establishment.establishment_controller import EstablishmentController
from modules.menu.menu_controller import MenuController
from modules.user.user_controller import UserController
from modules.category.category_controller import CategoryController


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return UserController.login(request.json)
    return jsonify(message="Method not allowed."), 405


@app.route('/logout', methods=['GET'])
def logout():
    if request.method == 'GET':
        return UserController.logout()
    return jsonify(message="Method not allowed."), 405


@app.route('/users', methods=['GET', 'POST'])
def get_all_or_create_users():
    if request.method == 'GET':
        return UserController.get_all_users()
    elif request.method == 'POST':
        return UserController.create_user(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_update_or_delete_user(id):
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


@app.route('/establishments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_put_or_delete_establishment(id):
    if request.method == 'GET':
        return EstablishmentController.get_establishment_by_id(id)
    elif request.method == 'PUT':
        return EstablishmentController.update_establishment(id, request.json)
    elif request.method == 'DELETE':
        return EstablishmentController.delete_establishment(id)
    else:
        return jsonify(message="Method not allowed."), 405


# @app.route('/menus', methods=['GET', 'POST'])
# def get_all_or_create_menus():
#     if request.method == 'GET':
#         return MenuController.get_all_menus()
#     elif request.method == 'POST':
#         return MenuController.create_menu(request.json)
#     else:
#         return jsonify(message="Method not allowed."), 405
#
#
# @app.route('/menus/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# def get_update_or_delete_menu(id):
#     if request.method == 'GET':
#         return MenuController.get_menu_by_id(id)
#     elif request.method == 'PUT':
#         return MenuController.update_menu(id, request.json)
#     elif request.method == 'DELETE':
#         return MenuController.delete_menu(id)
#     else:
#         return jsonify(message="Method not allowed."), 405


@app.route('/dishes', methods=['GET', 'POST'])
def get_all_or_create_dishes():
    if request.method == 'GET':
        return DishController.get_all_dishes()
    elif request.method == 'POST':
        return DishController.create_dish(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/dishes/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_update_or_delete_dish(id):
    if request.method == 'GET':
        return DishController.get_dish_by_id(id)
    elif request.method == 'PUT':
        return DishController.update_dish(id, request.json)
    elif request.method == 'DELETE':
        return DishController.delete_dish(id)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/categories', methods=['GET', 'POST'])
def get_all_or_create_menus():
    if request.method == 'GET':
        return CategoryController.get_all_categories()
    elif request.method == 'POST':
        return CategoryController.create_category(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/categories/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_update_or_delete_menu(id):
    if request.method == 'GET':
        return CategoryController.get_category_by_id(id)
    elif request.method == 'PUT':
        return CategoryController.update_category(id, request.json)
    elif request.method == 'DELETE':
        return CategoryController.delete_category(id)
    else:
        return jsonify(message="Method not allowed."), 405


if __name__ == '__main__':
    app.run()
