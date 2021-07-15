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

router.post('/', async (req, res) => {
  const body = req.body;
  try {

    const recipeData = await Recipe.findAll({
      where: {
        category: body.category,
        hasMeat: req.session.user_meat,
        hasDairy: req.session.user_dairy,
        hasFish: req.session.user_fish,
        hasGluten: req.session.user_gluten,
        [Op.or]: [
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
    // TODO: replace 0 with random number between 0 and recipeData.length
    const recipe = recipeData[getRandomNumber(recipeData.length - 1)].get({ plain: true })
    res.status(200).json(recipe);
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
