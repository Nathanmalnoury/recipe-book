#! usr/bin/python3.8
from flask import Flask, request
from flask_cors import CORS
from mongoengine.errors import NotUniqueError

from mongo import MongoClient
from scrapper import Scrapper

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
mongo = MongoClient()


@app.route('/recipe/all')
def all_recipe():
    return mongo.get_all_recipes()


@app.route('/create/recipe/', methods=['POST'])
def create_recipe():
    json_data = request.get_json()
    url = json_data.get('url')
    type_recipe = json_data.get('typeRecipe')
    print(f'Creating entry \'{type_recipe}\' for url: \'{url}\'')

    if type_recipe is None:
        raise ValueError("typeRecipe is empty")
    if url is None:
        raise ValueError("URL is empty")

    new_id = mongo.add_recipe(
        Scrapper(url=url, type_recipe=type_recipe).scrap()
    )
    return {'success': True, 'id': str(new_id)}


@app.route('/recipe/favourite', methods=["POST"])
def change_favourite():
    data = request.get_json()
    id_ = data.get('id')
    favourite = data.get('favourite')
    recipe = mongo.get({'id': id_})[0]
    recipe.favorite = favourite
    recipe.save()
    return recipe.to_json()


@app.route('/recipe/<id_>', methods=["GET"])
def get_recipe(id_):
    resp = mongo.get({'id': id_})[0]
    return resp.to_json()


@app.route('/recipe/<id_>/view', methods=['GET'])
def view_recipe(id_):
    recipe = mongo.get({'id': id_})[0]
    return recipe.content


@app.route('/recipe/<id_>', methods=["DELETE"])
def delete_recipe(id_):
    mongo.delete_one(id_)
    return {'success': True}


@app.errorhandler(ValueError)
def value_error(error: ValueError):
    return {"message": error.__str__()}, 400


@app.errorhandler(NotUniqueError)
def not_unique(error):
    return {"message": "This recipe is already stored"}, 400


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5300)
