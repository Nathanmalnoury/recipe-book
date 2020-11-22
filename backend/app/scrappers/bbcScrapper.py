from bs4 import BeautifulSoup
from .scrapper import Scrapper
import requests
from io import BytesIO


class BbcScrapper(Scrapper):
    def __init__(self, url: str, type_recipe: str):
        Scrapper.__init__(self, url, type_recipe)
        print('BBC')

    def get_soup(self):
        if self.soup is not None:
            return self.soup
        self.soup = BeautifulSoup(self.get_html(), features="html.parser")
        return self.soup

    def find_title(self):
        titles = self.get_soup().find_all(name="h1")
        for match in titles:
            try:
                if 'content-title__text' in match.get('class'):
                    return match.text.strip()

            except:
                continue

    def find_image_src(self, title_recipe):
        images = self.get_soup().find_all(name='img')
        for image in images:
            print(
                f"'{image.get('alt').strip().lower()}' , '{title_recipe.lower()}'")
            if image.get('alt').strip().lower() == title_recipe.lower():
                return image.get('src')

    def scrap(self):
        self.get_soup()
        try:
            title = self.find_title()
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
