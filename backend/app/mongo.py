from mongoengine import connect

from models.recipe import Recipe


class MongoClient:
    def __init__(self):
        self.client = connect('recipe')

    def get_all_recipes(self):
        return Recipe.objects().exclude('content').to_json()

    def add_recipe(self, recipe):
        """Add a recipe to mongoDB

        Arguments:
            recipe {dict} -- Dict containing the info about the recipe.
                            {url:str, title:str, content:str, image_url:str}

        Returns:
            str -- id of the newly created entry
        """
        new_recipe = Recipe(**recipe)
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
