const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {

    // Get all recipes and JOIN with user data
    // TODO: update to JOIN what's in fridge
    const recipeData = await Recipe.findAll(
      // {
      // // include: [
      // //   {
      // //     model: User,
      // //     attributes: ['name'],
      // //   },
      // // ],
      // }
    );

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id,
      // {
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
      // }
    );

    const recipe = recipeData.get({ plain: true });

    res.render('recipe', {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/preferences', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('preferences', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // TODO: Eventually reroute to getRecipe page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
