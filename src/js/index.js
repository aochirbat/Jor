require('@babel/polyfill');
import Search from './model/Search';
import { elements , renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import {renderRecipe , clearRecipe, highlightSelectedRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';
/**
 * Web app төлөв
 * - Хайлтын query, үр дүн 
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */
 const state = {};
 const controlSearch = async () =>{
    // 1) Вебээс хайлтын түлхүүр үгийг гаргаж авна.
        const query = searchView.getInput();
    
        if(query){
            // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
            state.search = new Search(query);
            // 3) Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ.
            searchView.clearSearchQuery();
            searchView.clearSearchResult();
            renderLoader(elements.searchResDiv);
            // 4) Хайлтыг гүйцэтгэнэ.

            await state.search.doSearch();

            // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
            clearLoader();
            if(state.search.result === undefined) alert('Ийм хоол одоогоор байхгүй байна....');
            else searchView.renderRecipes(state.search.result);
        }
    
 };
 elements.searchForm.addEventListener('submit' , e =>{
    e.preventDefault();
    controlSearch();
 });
 elements.pageButtons.addEventListener('click' , e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
 });

/**
 * Жорын контроллер
 */
const controlRecipe = async ()=>{
    // 1) URL-аас id салгаж авна.
        const id = window.location.hash.replace("#", "");
        if(id){
            // 2) Жорын моделийг үүсгэж өгнө.
        state.recipe = new Recipe(id);
        // 3) UI дэлгэцийг бэлтгэнэ.
            clearRecipe(); 
            renderLoader(elements.recipeDiv);
            highlightSelectedRecipe(id);
        // 4) Жороо татаж авчирна.
            await state.recipe.getRecipe();
        // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
            clearLoader();
            state.recipe.calcTime();
            state.recipe.calcPersonLength();
        // 6) Жороо дэлгэцэнд гаргана.
            renderRecipe(state.recipe);   
        }

};
 ['hashchange','load'].forEach(e => window.addEventListener(e, controlRecipe));

 /**
  * Найрлагын контроллер
  */
const controlList = () =>{
    //Найрлаганы моделийг үүсгэнэ.
        state.list = new List();
        listView.clearShoppingItems();
    //Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
    state.recipe.ingredients.forEach(n => {
        state.list.addItem(n);
        listView.renderItem(n);
    });
};
elements.recipeDiv.addEventListener('click', e => {
    if(e.target.matches('.recipe__btn , .recipe__btn * ')){
        controlList();
    }
});