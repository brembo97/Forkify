export const elements = {
    searchBtn: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    resultsDiv: document.querySelector('.results'),
    resultsList: document.querySelector('.results__list'),
    resultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesField: document.querySelector('.likes__field'),
    likedList: document.querySelector('.likes__list')
}

const elementStrings = {
    loader: "loader"
}

export const renderLoader = parent => {
    const loader = `
    <div class=${elementStrings.loader}>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
   const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}