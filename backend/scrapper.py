"""
Scrapper for recipe parsing.

Tested and working with:
- NYT cooking,
- Jamie Oliver's website,
- BBC Good Food

"""
from urllib.parse import urljoin
import requests

from bs4 import BeautifulSoup


class Scrapper():
    """Role is to scrap various recipe websites."""
    headers = requests.utils.default_headers()
    headers.update({
        'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)'
        ' Chrome/51.0.2704.103 Safari/537.36'
    })

    def __init__(self, url: str, type_recipe: str):
        self.type_recipe = type_recipe
        self.url = url
        self.html = None
        self.soup = None

    def get_soup(self):
        if self.soup is not None:
            return self.soup

        self.soup = BeautifulSoup(self.get_html(), features="html.parser")
        self.soup = self.fix_src_urls(self.soup, self.url)
        return self.soup

    def get_html(self):
        if self.html is not None:
            return self.html
        req = requests.get(self.url, headers=self.headers)
        self.html = req.text
        return self.html

    def scrap(self):
        """
        Scrap a recipe
        Returns:
            dict --{image_url:str, content: str, title:str}
        """
        self.get_soup()
        try:
            title = self.find_title()
        except Exception:
            print('Exception in find title')
            title = None

        try:
            image_url = self.find_image_src(title)
        except Exception:
            image_url = None

        recipe_dict = {
            "image_url": image_url,
            "title": title,
            "content": str(self.soup),
            "type_recipe": self.type_recipe,
        }
        return recipe_dict

    def find_title(self):
        def title_finder(css_class):
            if css_class is None:
                return False
            elif (css_class.find('recipe') != -1
                  and css_class.find('title') != -1
                  and css_class.find('related') == -1):
                return True
            else:
                return False

        for tag_title in self.get_soup().find_all(class_=title_finder):
            if tag_title.text is not None:
                print(f'found title: \'{tag_title.text.strip()}\'')
                return tag_title.text.strip()

    def find_image_src(self, title_recipe):
        if title_recipe is None:
            return self.get_soup().find('img').src

        for tag in self.get_soup().find_all('img'):
            if tag.get('alt') == title_recipe or tag.get('title') == title_recipe:
                src = urljoin(self.url, tag.get('src'))
                return src

        print('Could not find the image')
        return None

    @staticmethod
    def fix_src_urls(soup, url):
        """Fix gref and scr urls.

        Meaning that urls starting with:
        - `//url` become `http://url`
        - `/url` become `http://website/url`
        - `http://website` remain untouched
        """
        counters = {
            'need_http': 0,
            'need_website_main_url': 0,
            'properly_formatted': 0.
        }
        for tag in soup.find_all(href=True):
            tag['href'] = urljoin(url, tag.get('href'))
            tag.replace_with(tag)

        for tag in soup.find_all(src=True):
            tag['src'] = urljoin(url, tag.get('src'))
            tag.replace_with(tag)

        return soup
