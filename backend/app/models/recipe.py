from mongoengine import Document, fields as f
from werkzeug.utils import redirect


class Recipe(Document):
    title = f.StringField(required=True, unique=True)
    image = f.FileField(required=False)
    content = f.StringField(required=False)
    redirect = f.URLField(required=False)
    favorite = f.BooleanField(default=False)
    type_recipe = f.StringField(required=True,
                                choices=['starter', 'main', 'dessert']
                                )
