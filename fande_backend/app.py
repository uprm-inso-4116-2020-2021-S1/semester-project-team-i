from flask import Flask, request, jsonify

from modules.user.user_controller import UserController

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run()
