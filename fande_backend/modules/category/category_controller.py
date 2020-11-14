from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.category.category_dao import Category


class CategoryController:
    @staticmethod
    @error_validation(method='GET')
    def get_all_categories():
        categories = Category.get_all_categories()
        result_list = [category.to_dict() for category in categories]
        result = {
            'message': 'Success!',
            'categories': result_list,
        }
        return jsonify(result), 200

    @staticmethod
    def get_category_by_id(cid):
        if cid:
            try:
                category = Category.get_category_by_id(cid)
                if not category:
                    return jsonify(message='Category Not Found!'), 404
                result = {
                    'message': 'Success!',
                    'category': category.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def create_category(json):
        valid_params = verify_params(json, Category.CATEGORY_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_category = Category(**valid_params)
                created_category = new_category.create()
                result = {
                    'message': 'Success!',
                    'category': created_category.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_category(cid, json):
        valid_params = verify_params(json, Category.CATEGORY_REQUIRED_PARAMS)
        if cid and valid_params:
            try:
                category_to_update = Category.get_category_by_id(cid)
                for key, value in valid_params.items():
                    setattr(category_to_update, key, value)
                category_to_update.update()
                result = {
                    "message": "Success!",
                    "category": category_to_update.to_dict()
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def delete_category(cid):
        if cid:
            try:
                category_to_delete = Category.get_category_by_id(cid)
                if not category_to_delete:
                    return jsonify(message="Not Found!"), 404
                category_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
