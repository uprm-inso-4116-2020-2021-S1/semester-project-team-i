import bcrypt
from flask import jsonify, session

from modules.common.strategy import BaseAPIStrategy, AuthenticationStrategy
from modules.user.user_dao import User
from helpers.decorator import verify_params, error_validation


class UserAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self):
        users = User.get_all_users()
        result_list = []
        for user in users:
            result_list.append(user.to_dict())
        result = {
            "message": "Success!",
            "users": result_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                user = User.get_user_by_id(oid)
                if not user:
                    return jsonify(message="User Not Found"), 404
                result = {
                    'message': 'Success!',
                    'user': user.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    # @error_validation(method='POST')
    def create(self, params):
        valid_params = verify_params(params, User.USER_REQUIRED_PARAMETERS)
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

    def update(self, oid, params):
        valid_params = verify_params(params, User.USER_REQUIRED_PARAMETERS)
        if oid and valid_params:
            try:
                user_to_update = User.get_user_by_id(oid)
                if user_to_update:
                    for key, value in valid_params.items():
                        if key == "password":
                            if value != user_to_update.password and not \
                                    bcrypt.checkpw(value.encode('utf-8'), user_to_update.password.encode('utf-8')):
                                user_to_update.update_password(value)
                        else:
                            setattr(user_to_update, key, value)
                    user_to_update.update()
                    result = {
                        "message": "Success!",
                        "user": user_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def delete(self, oid):
        if oid:
            try:
                user_to_delete = User.get_user_by_id(oid)
                if user_to_delete:
                    user_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400


class UserAuthenticationStrategy(AuthenticationStrategy):
    @error_validation(method='POST')
    def login(self, json):
        valid_params = verify_params(json, User.USER_LOGIN_REQUIRED_PARAMS)
        if not valid_params:
            return jsonify(message="Bad Request!"), 400
        user = User.get_user_by_username(valid_params['username'])
        if user:
            password = valid_params['password']
            if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                session['logged_in'] = True
                status = True
                result = {
                    "status": status,
                    "user_id": user.uid
                }
                return jsonify(result), 200
            else:
                return jsonify(message="Username or password is wrong."), 400
        else:
            return jsonify(message="Username Not Found!"), 404

    @error_validation(method='GET')
    def logout(self):
        session['logged_in'] = False
        return jsonify(status='Success!'), 200
