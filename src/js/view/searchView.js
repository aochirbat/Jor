import {elements} from './base';
import Recipe from '../model/Recipe';

//private
const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
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
    elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchText.value;
export const renderRecipes = (recipes, currentPage = 1 , resPerPage = 8) => {
    // Хайлтын үр дүнг хууадаслаж үзүүлэх
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start , end).forEach(renderRecipe);
    //Хуудаслалтын товчуудыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage , totalPages);
};
const createButton = (page , type , direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
        <span>Хуудас ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
    </button>`;
const renderButtons = (currentPage , totalPages) => {
    let buttonHTML;
    if(currentPage === 1 && totalPages > 1){
        // 1-р хуудас дээр байна, 2-р хуудас гэдэг товчийг гарга.
        buttonHTML = createButton(2 , 'next' , 'right');
    } else if(currentPage < totalPages) {
        // Өмнөх дараачийн хуудас руу шилжэх товчуудыш үзүүл.
        buttonHTML = createButton(currentPage - 1, 'prev', 'left');
        buttonHTML += createButton(currentPage + 1, 'next', 'right');
    }else if(currentPage === totalPages){
        // Хамгийн сүүлийн хуудас дээр байна.Өмнөх рүү шилжэх товчийг л үзүүлнэ.
        buttonHTML = createButton(currentPage - 1, 'prev' , 'left');
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHTML);
};
