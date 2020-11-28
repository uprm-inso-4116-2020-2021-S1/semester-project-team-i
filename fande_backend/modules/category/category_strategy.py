from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.category.category_dao import Category
from modules.common.strategy import BaseAPIStrategy


class CategoryAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self):
        categories = Category.get_all_categories()
        result_list = [category.to_dict() for category in categories]
        result = {
            'message': 'Success!',
            'categories': result_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                category = Category.get_category_by_id(oid)
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

    def create(self, params):
        valid_params = verify_params(params, Category.CATEGORY_REQUIRED_PARAMS)
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

    def update(self, oid, params):
        valid_params = verify_params(params, Category.CATEGORY_REQUIRED_PARAMS)
        if oid and valid_params:
            try:
                category_to_update = Category.get_category_by_id(oid)
                if not category_to_update:
                    return jsonify(message='Category Not Found!'), 404
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

    def delete(self, oid):
        if oid:
            try:
                category_to_delete = Category.get_category_by_id(oid)
                if not category_to_delete:
                    return jsonify(message="Not Found!"), 404
                category_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
