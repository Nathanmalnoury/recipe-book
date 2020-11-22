from bs4 import BeautifulSoup
from .scrapper import Scrapper
import requests
from io import BytesIO
from slugify import slugify


class BbcGoodFoodScrapper(Scrapper):
    def __init__(self, url: str, type_recipe: str):
        Scrapper.__init__(self, url, type_recipe)
        print('BBCGoodFood')

    def get_soup(self):
        if self.soup is not None:
            return self.soup
        self.soup = BeautifulSoup(self.get_html(), features="html.parser")
        return self.soup

    def find_title(self):
        titles = self.get_soup().find_all(name="h1")
        for match in titles:
            print(match.get('class'))
            try:
                classes: list = match.get('class')
                if 'masthead__title' in classes and 'heading-1' in classes:
                    return match.text.strip()

            except:
                continue

    def find_image_src(self, title_recipe):
        images = self.get_soup().find_all(name='img')
        for image in images:
            if not image.get('title'):
                continue
            if slugify(image.get('title')) == slugify(title_recipe):
                return image.get('src')

    def scrap(self):
        self.get_soup()
        try:
            title = self.find_title()
            print(f'Title : {title}')
        except Exception:
            print('Exception in find title')
            title = None

        try:
            image_url = self.find_image_src(title)
            image_type = self.get_image_type(image_url)
            req_image = requests.get(image_url, headers=self.headers)
            assert req_image.ok

            image = BytesIO(req_image.content)

        except Exception:
            print("No image")
            image = None
            image_type = None

        recipe_dict = {
            "image_type": image_type,
            "image": image,
            "title": title,
            "redirect": self.url,
            "type_recipe": self.type_recipe,
        }
        return recipe_dict
