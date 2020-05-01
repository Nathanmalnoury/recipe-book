import requests


def scrap_recipe(url):
    """
    Scrap a recipe

    Arguments:
        url {str} -- Url to the recipe to scrap

    Returns:
        dict --{url: str, image_url:str, content: str, title:str}
    """
    r = requests.get(url)
    print(r)
    return r


if __name__ == "__main__":
    URL_TEST = "https://cooking.nytimes.com/recipes/1020907-toor-dal-split-yellow-pigeon-peas"
    print(scrap_recipe(URL_TEST))
