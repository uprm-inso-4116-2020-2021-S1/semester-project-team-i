from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.menu.menu_dao import Menu


class MenuController:
    @staticmethod
    @error_validation(method='GET')
    def get_all_menus():
        menus = Menu.get_all_menus()
        result_list = [menu.to_dict() for menu in menus]
        result = {
            'message': 'Success!',
            'menus': result_list,
        }
        return jsonify(result), 200

    @staticmethod
    def get_menu_by_id(mid):
        if mid:
            try:
                menu = Menu.get_menu_by_id(mid)
                if not menu:
                    return jsonify(message='Menu Not Found!'), 404
                result = {
                    'message': 'Success!',
                    'menu': menu.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def create_menu(json):
        valid_params = verify_params(json, Menu.MENU_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_menu = Menu(**valid_params)
                created_menu = new_menu.create()
                result = {
                    'message': 'Success!',
                    'menu': created_menu.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_menu(mid, json):
        valid_params = verify_params(json, Menu.MENU_REQUIRED_PARAMS)
        if mid and valid_params:
            try:
                menu_to_update = Menu.get_menu_by_id(mid)
                for key, value in valid_params.items():
                    setattr(menu_to_update, key, value)
                menu_to_update.update()
                result = {
                    "message": "Success!",
                    "menu": menu_to_update.to_dict()
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def delete_menu(mid):
        if mid:
            try:
                menu_to_delete = Menu.get_menu_by_id(mid)
                if not menu_to_delete:
                    return jsonify(message="Not Found!"), 404
                menu_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
