from mongoengine import Document, fields as f


class Recipe(Document):
    url = f.URLField(required=True, unique=True)
    title = f.StringField(required=True)
    image_url = f.URLField(required=False)
