const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // TODO: save preferences to session
      req.session.user_meat = userData.eatsMeat;
      req.session.user_dairy = userData.eatsDairy;
      req.session.user_fish = userData.eatsFish;
      req.session.user_gluten = userData.eatsGluten;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/update', async (req, res) => {
  try {
    const userData = await User.update(
      {
        eatsMeat: req.body.eatsMeat,
        eatsDairy: req.body.eatsDairy,
        eatsFish: req.body.eatsFish,
        eatsGluten: req.body.eatsGluten,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );
    req.session.user_meat = req.body.eatsMeat;
    req.session.user_dairy = req.body.eatsDairy;
    req.session.user_fish = req.body.eatsFish;
    req.session.user_gluten = req.body.eatsGluten;
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // TODO: save preferences to session
      req.session.user_meat = userData.eatsMeat;
      req.session.user_dairy = userData.eatsDairy;
      req.session.user_fish = userData.eatsFish;
      req.session.user_gluten = userData.eatsGluten;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
