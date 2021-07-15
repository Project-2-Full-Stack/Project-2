const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require("sequelize");

let getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

// let generateOrStatements = (ingredients) => {
//   let finalArray = [];
//   for (let i = 0; i < ingredients.length; i++) {
//     `%${ingredients[i]}%`
//   }
// }
let generatePreferences = (req) => {
  let prefOptionsArray = {};
  if (!req.session.user_meat) {
    prefOptionsArray.hasMeat = false;
  }
  if (!req.session.user_dairy) {
    prefOptionsArray.hasDairy = false;
  }
  if (!req.session.user_fish) {
    prefOptionsArray.hasFish = false;
  }
  if (!req.session.user_gluten) {
    prefOptionsArray.hasGluten = false;
  }
  return prefOptionsArray;
}

// a method to get recipes using user preferences and selected criteria
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    // if user selected surprise me button, we will use selected category to return random recipe from the result
    if (body.randomRecipe) {
      const recipeData = await Recipe.findAll({
        where: {
          category: body.category,
          ...generatePreferences(req)
        }
      });
      const recipe = recipeData[getRandomNumber(recipeData.length - 1)].get({ plain: true });
      res.status(200).json([recipe]);
    } else {
      // if user selected category and ingredients, we will use them to return matched recipes
      const recipeData = await Recipe.findAll({
        where: {
          category: body.category,
          ...generatePreferences(req),
          [Op.or]: [ // TODO: replace this with dynamic filter where user can have any number of ingredients
            {
              ingredients: {
                [Op.like]: `%${body.ingredients[0]}%`
              }
            },
            {
              ingredients: {
                [Op.like]: `%${body.ingredients[1]}%`
              }
            },
            {
              ingredients: {
                [Op.like]: `%${body.ingredients[2]}%`
              }
            }
          ]
        }
      });
      res.status(200).json(recipeData);
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
