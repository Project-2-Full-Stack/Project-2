// global variables

let getRandomRecipeNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//TODO: add comment of what this function does
const showRecipeHandler = (event, getRandomRecipe) => {
    event.preventDefault();

    const selectedCuisine = document.querySelector('input[name="cuisine"]:checked') ? document.querySelector('input[name="cuisine"]:checked').value : '';
    const selectedIngredients = document.querySelectorAll('input[name="ingredient"]:checked') || '';

    let ingredients = [];
    for (var ingredient of selectedIngredients) {
        ingredients.push(ingredient.value);
    }

    if (!getRandomRecipe && ingredients.length === 0) {
        alert('Please select at least one ingredient');
        return;
    }

    fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ category: selectedCuisine, ingredients: ingredients, randomRecipe: getRandomRecipe }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        return response.json();
    }).then(function (recipes) {
        let recipeId;
        if (recipes.length === 0) {
            alert('Sorry, there are no recipes in this database that match your criteria - we think you should try this instead!');
            recipeId = getRandomRecipeNumber(1, 15);
            document.location.replace(`/recipe/${recipeId}`);
        } else {
            generateRecipeList(recipes);
            document.location.replace(`#recipes-list`);
        }
    });
};

let generateRecipeList = (recipes) => {
    let recipesEl = document.querySelector('#recipes-list');
    recipesEl.innerHTML = '';
    let totalRecipes = recipes.length > 3 ? 3 : recipes.length;
    recipesEl.innerHTML += `<h2>Here are our recommendations...</h2>`;
    for (let i = 0; i < totalRecipes; i++) {
        console.log(recipes[i]);
        recipesEl.innerHTML += `<div class="card my-5">
        <div class="card-header"><a href="/recipe/${recipes[i].id}">${recipes[i].name}</a></div>
        <div class="card-body flex-row">
        <div class="flex-child p-2"><img src=${recipes[i].imgUrl}></div>
        <div class="flex-child flex-grow-6 p-2">${recipes[i].details}<br>
        <a class='btn btn-info btn-sm btn-bottom' href="/recipe/${recipes[i].id}"> View </a>
        </div>
        </div>
      </div>`;
    }
}

document
    .querySelector('#get-recipe-btn')
    .addEventListener('click', (e) => showRecipeHandler(e, false));

document
    .querySelector('#surprise-btn')
    .addEventListener('click', (e) => showRecipeHandler(e, true));