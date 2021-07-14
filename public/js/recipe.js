const showRecipeHandler = (event) => {
    event.preventDefault();

    const selectedCuisine = document.querySelector('input[name="cuisine"]:checked').value || '';
    const selectedIngredients = document.querySelector('input[name="ingredient"]:checked').value || '';

    fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ category: selectedCuisine, ingredients: selectedIngredients }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.location.replace(`/recipe/${data.id}`);
    });
};

document
    .querySelector('#get-recipe-btn')
    .addEventListener('click', showRecipeHandler);