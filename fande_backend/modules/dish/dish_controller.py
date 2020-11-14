from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.dish.dish_dao import Dish


class DishController:
    @staticmethod
    @error_validation(method='GET')
    def get_all_dishes():
        dishes = Dish.get_all_dishes()
        result_list = [dish.to_dict() for dish in dishes]
        result = {
            'message': 'Success!',
            'dishes': result_list,
        }
        return jsonify(result), 200

    @staticmethod
    def get_dish_by_id(did):
        if did:
            try:
                dish = Dish.get_dish_by_id(did)
                if not dish:
                    return jsonify(message='Dish Not Found!'), 404
                result = {
                    'message': 'Success!',
                    'dish': dish.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def create_dish(json):
        valid_params = verify_params(json, Dish.DISH_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_dish = Dish(**valid_params)
                created_dish = new_dish.create()
                result = {
                    'message': 'Success!',
                    'dish': created_dish.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_dish(did, json):
        valid_params = verify_params(json, Dish.DISH_REQUIRED_PARAMS)
        if did and valid_params:
            try:
                dish_to_update = Dish.get_dish_by_id(did)
                for key, value in valid_params.items():
                    setattr(dish_to_update, key, value)
                dish_to_update.update()
                result = {
                    "message": "Success!",
                    "dish": dish_to_update.to_dict()
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def delete_dish(did):
        if did:
            try:
                dish_to_delete = Dish.get_dish_by_id(did)
                if not dish_to_delete:
                    return jsonify(message="Not Found!"), 404
                dish_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
