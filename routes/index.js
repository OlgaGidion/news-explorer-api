const router = require('express').Router();
const signup = require('./signup');
const signin = require('./signin');
const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/users', auth, users);
router.use('/articles', auth, articles);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
