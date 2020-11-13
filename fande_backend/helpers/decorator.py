import functools

from flask import jsonify


# TODO: validate function
def verify_params(params, required_params):
    """
    Verify the validity of submitted parameter.
    :param params: submitted params
    :param required_params: list of required parameters
    :return: params, otherwise none
    """
    for param, value in params.items():
        if param in required_params and value is None:
            return None
    return params


def error_validation(method):
    def validate(func):
        @functools.wraps(func)
        def wrapper_validate(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as err:
                return jsonify(message="Server error!", err=err.__str__()), 500
        return wrapper_validate
    return validate
