const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { signin } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signin);

module.exports = router;
