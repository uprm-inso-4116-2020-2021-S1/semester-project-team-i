from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.common.strategy import BaseAPIStrategy
from modules.dish.dish_dao import Dish


class DishAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self, params=None):
        dishes = Dish.get_all_dishes()
        if params:
            establishment_id = params.get('eid', None)
            limit = params.get('limit', None)
            top_rated = params.get('topRated', None)
            featured = params.get('featured', None)
            if establishment_id and limit:
                dishes = Dish.get_top_dishes_by_establishment(int(establishment_id), int(limit))
            elif top_rated and limit:
                dishes = Dish.get_top_dishes(int(limit))
            elif featured and limit:
                dishes = Dish.get_random_dishes(int(limit))
        result_list = [dish.to_dict() for dish in dishes]
        result = {
            'message': 'Success!',
            'dishes': result_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                dish = Dish.get_dish_by_id(oid)
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

    def create(self, params):
        valid_params = verify_params(params, Dish.DISH_REQUIRED_PARAMS)
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

    def update(self, oid, params):
        valid_params = verify_params(params, Dish.DISH_REQUIRED_PARAMS)
        if oid and valid_params:
            try:
                dish_to_update = Dish.get_dish_by_id(oid)
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

    def delete(self, oid):
        if oid:
            try:
                dish_to_delete = Dish.get_dish_by_id(oid)
                if not dish_to_delete:
                    return jsonify(message="Not Found!"), 404
                dish_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
