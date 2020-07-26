import {elements} from './base';

//private
const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link results__link--active" href="${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML("beforeend" , markup);
};


export const clearSearchQuery = () => {
    elements.searchText.value = "";
};
export const clearSearchResult = () =>{
    elements.searchResultList.innerHTML = "";
};
export const getInput = () => elements.searchText.value;
export const renderRecipes = recipes => {
    if(recipes === undefined) alert("Ийм хоол олдсонгүй....")
    else recipes.forEach(renderRecipe);
};