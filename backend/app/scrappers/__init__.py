from scrappers.scrapper import Scrapper
from scrappers.bbcScrapper import BbcScrapper
from scrappers.bbcGoodFoodScrapper import BbcGoodFoodScrapper


def scrap(url, type_recipe):
    if url.startswith("https://www.bbc.co.uk"):
        ScrapperToUse = BbcScrapper
    elif url.startswith('https://www.bbcgoodfood.com/'):
        ScrapperToUse = BbcGoodFoodScrapper
    else:
        ScrapperToUse = Scrapper
    return ScrapperToUse(url=url, type_recipe=type_recipe).scrap()
