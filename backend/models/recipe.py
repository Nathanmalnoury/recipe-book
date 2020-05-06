from mongoengine import Document, fields as f


class Recipe(Document):
    title = f.StringField(required=True)
    image_url = f.URLField(required=False)
    content = f.StringField(required=True)
    favorite = f.BooleanField(default=False)
    type_recipe = f.StringField(required=True,
                                choices=['starter', 'main', 'dessert']
                                )
