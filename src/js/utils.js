const getPostVar = (body) => {
  return {
    method: "POST",
    cors: "cors",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

const recipeSorter = (a, b) => {
  if (a.props.item.favorite && !b.props.item.favorite) {
    return -1;
  } else if (b.props.item.favorite && !a.props.item.favorite) {
    return 1;
  } else {
    return a.props.item.title > b.props.item.title;
  }
};

const apiUrl = process.env.REACT_APP_API_URL;

const openRecipeInBrowser = (e, recipeId) => {
  e.stopPropagation();
  let win = window.open(`${apiUrl}/recipe/${recipeId}/view`);
  win.focus();
};

export { getPostVar, recipeSorter, openRecipeInBrowser };
