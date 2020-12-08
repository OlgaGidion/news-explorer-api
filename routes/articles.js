const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllArticles,
  createArticle,
} = require('../controllers/articles');

router.get('/', getAllArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri({ scheme: ['https', 'http'] }),
    image: Joi.string().required().uri({ scheme: ['https', 'http'] }),
  }),
}), createArticle);

module.exports = router;
