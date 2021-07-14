const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require("sequelize");

router.post('/', async (req, res) => {
  const body = req.body;
  try {

    const recipeData = await Recipe.findAll({
      where: {
        category: body.category,
        ingredients: {
          [Op.like]: `%${body.ingredients}%`
        }
      }
    });

    // TODO: replace 0 with random number between 0 and recipeData.length
    const recipes = recipeData[0].get({ plain: true })
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
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
