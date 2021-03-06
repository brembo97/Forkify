import {elements} from './base'
import Fraction from 'fraction.js'

export const renderRecipeInfo = (recipe, isLiked) => {
    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked === true ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(createRecipe).join('')}
        </ul>

        <button class="btn-small recipe__btn recipe__btn-add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.source}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    `
elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

const createRecipe = ing => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${convertToFraction(ing.amount)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.name}
        </div>
    </li>
`
export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

const convertToFraction = number => {
    const [int,dec] = Array.from(number.toString().split('.'), el => parseInt(el,10));
    
    if(!dec)
        return number
    //edge case 1.999999
    if(dec > 9999 && dec.toString().includes('9'))
        return Math.ceil(number) ;
    if(int === 0){
        const x = new Fraction(number)
        return `${x.n}\\${x.d}`
    }else {
        const x = new Fraction(number - int)
        return `${int} ${x.n}\\${x.d}`
    }
}

export const updateServingsDisplay = recipe => {
    //Update servings
    document.querySelector(".recipe__info-data--people").textContent = recipe.servings;
    //Update each ingredient
    const ingAmounts = Array.from(document.querySelectorAll(".recipe__count"));
    ingAmounts.forEach( (el, i) => {
        el.textContent = convertToFraction(recipe.ingredients[i].amount);
    });
}