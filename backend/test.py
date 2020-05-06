import requests

from bs4 import BeautifulSoup

BASE_URL = "https://www.bbcgoodfood.com/recipes/slow-cooker-chicken-casserole"
MARKUP = '<a href="http://example.com/">I linked to <i>example.com</i></a>\n<a href="example.com">Hello</a>'
if __name__ == "__main__":
    soup = BeautifulSoup(MARKUP, features="html.parser")
    for tag in soup.find_all(href=True):
        tag['href'] = 'www.test.com'
        tag.replace_with(tag)
    print(soup)
