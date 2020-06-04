import json
import base64
from mongoengine import connect

from models.recipe import Recipe


class MongoClient:
    def __init__(self):
        self.client = connect('recipe')

    def get_all_recipes(self):
        response = []
        for rec in Recipe.objects():
            info = {
                "id": str(rec.id),
                "title": rec.title,
                "type_recipe": rec.type_recipe,
                "favorite": rec.favorite,
            }
            if rec.image:
                info["image"] = {
                    "content": base64.b64encode(rec.image.read()).decode("utf-8"),
                    "content-type": rec.image.content_type
                }
            response.append(info)
        return json.dumps(response)

    def add_recipe(self, recipe):
        """Add a recipe to mongoDB

        Arguments:
            recipe {dict} -- Dict containing the info about the recipe.
                            {url:str, title:str, content:str, image_url:str}

        Returns:
            str -- id of the newly created entry
        """
        type_image = recipe.pop("image_type")
        image = recipe.pop("image")

        new_recipe = Recipe(**recipe)
        if image is not None:
            new_recipe.image.put(image, content_type=type_image)
        recipe_object = new_recipe.save()
        return recipe_object.id

    def delete_all(self):
        Recipe.objects().delete()
        return None

    def delete_one(self, id_):
        """Delete one item

        Arguments:
            id_ {[str]} -- id of the item to delete.
        """
        Recipe.objects(id=id_).delete()
        return None

    def get(self, query):
        """Get a query.

        Arguments:
            query {dict} -- Query to run, as a dict.

        Returns:
            list -- Results got from the query. Might contain zero / one / several items
        """
        return Recipe.objects(**query)
