const showRecipeHandler = (event) => {
    event.preventDefault();

    const selectedCuisine = document.querySelector('input[name="cuisine"]:checked').value || '';
    const selectedIngredients = document.querySelectorAll('input[name="ingredient"]:checked') || '';

    let ingredients = [];
    for (var ingredient of selectedIngredients) {
        ingredients.push(ingredient.value);
    }

    fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ category: selectedCuisine, ingredients: ingredients }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        return response.json();
    }).then(function (recipe) {
        let recipeId;
        if (Object.keys(recipe).length === 0 && recipe.constructor === Object) {
            recipeId = 1;
        } else {
            recipeId = recipe.id;
        }
        document.location.replace(`/recipe/${recipeId}`);
    });
};

document
    .querySelector('#get-recipe-btn')
    .addEventListener('click', showRecipeHandler);