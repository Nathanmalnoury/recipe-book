from mongoengine import connect
from models.recipe import Recipe


class MongoClient:
    def __init__(self):
        self.client = connect('recipe')

    def get_all_recipes(self):
        return(Recipe.objects().to_json())

    def add_recipe(self, recipe):
        new_recipe = Recipe(**recipe)
        a = new_recipe.save()
        return a.id

    def delete_all(self):
        Recipe.objects().delete()
        return None

    def delete_one(self, id_):
        """Delete one item

        Arguments:
            id_ {[type]} -- id of the item to delete.
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


# if __name__ == "__main__":
#     m = Mongo()
#     test1 = {
#         "url": "http://www.test.fr",
#         "title": "first_test",
#         "image_url": "http://www.test.img.fr",
#     }
#     m.hello_world()
#     try:
#         a = m.add_recipe(test1)
#     except:
#         print("Not added")
#         pass

#     obj = m.get({"title": "first_test"})
#     print(obj[0].id)
#     m.delete_one(id_=obj.id)
#     print("deleted")

#     print(m.get_all_recipes())
