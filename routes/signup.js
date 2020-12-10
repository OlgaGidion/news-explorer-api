const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { createUser } = require('../controllers/createUser');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;
