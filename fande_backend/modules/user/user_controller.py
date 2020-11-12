from flask import jsonify

from modules.user.user_dao import User
from helpers.decorator import verify_params, error_validation


class UserController:
    @staticmethod
    @error_validation(method='GET')
    def get_all_users():
        users = User.get_all_users()
        result_list = []
        for user in users:
            result_list.append(user.to_dict())
        result = {
            "message": "Success!",
            "users": result_list,
        }
        return jsonify(result), 200

    @staticmethod
    def get_user_by_id(id):
        pass

    @staticmethod
    # @error_validation(method='POST')
    def create_user(json):
        valid_params = verify_params(json, User.USER_REQUIRED_PARAMETERS)
        if valid_params:
            try:
                username_exists = User.verify_username(valid_params.get('username'))
                if username_exists:
                    return jsonify(message="Username already taken."), 400
                new_user = User(**valid_params)
                created_user = new_user.create()
                result = {
                    "message": "Success!",
                    "user": created_user.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_user(id, json):
        pass

    @staticmethod
    def delete_user(id):
        pass
