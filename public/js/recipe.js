// global variables
// NEED TO ADD THE FOLLOWING FOR RENDER RECIPE CARD - TD
// let recipeContainer = document.getElementById('recipeContainer');

//TODO: add comment of what this function does
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

//EVENTUALLY NEED THE FOLLOWING TO RENDER RECIPE CARD - TD
//added from beatwave - Eventually will render Recipe Card onto page
// function renderRecipeCard() {
//     fetch(`/api/recipes`, {
//         method: 'POST',
//         body: JSON.stringify({category: selectedCuisine, ingredients: selectedIngredients}),
//         headers: {
//             'Content-Type': 'application/json',
//         },
        
//     }).then(function (response) {
//         console.log(response, 'fuck yeah',)
//         // return response.json();
//     }).then(function (data) {
//         console.log('nailed it!') 

        // document.location.replace(`/recipe/${data.id}`);

    //   recipeContainer.innerHTML = '';
    //   data.daily.forEach((day, index) => {
    //     if (index === 0) {
    //       return;
    //     }
    //     let dayo = new Date(day.dt * 1000);
    //     var options = { weekday: 'long' };
    //     let tempForecast = day.temp.day;
    //     let conditionForecast = day.weather[0].description;
    //     let recipeCard = document.createElement('div');
    //     let temp = document.createElement('h1');
    //     let dayName = document.createElement('p');
    //     dayName.innerHTML = new Intl.DateTimeFormat('en-US', options).format(
    //       dayo
    //     );
    //     temp.innerHTML = tempForecast;
    //     recipeCard.style.backgroundColor = 'darkorange';
    //     recipeCard.style.border = '2px solid black';
    //     recipeCard.append(name);
    //     recipeCard.append(category);
    //     let details = document.createElement('p');
    //     details.innerHTML = conditionForecast;
    //     recipeCard.append(description);
    //     recipeContainer.append(recipeCard);
    //   });
//     });
// }


document
    .querySelector('#get-recipe-btn')
    .addEventListener('click', showRecipeHandler);