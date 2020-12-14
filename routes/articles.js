const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllArticles,
  saveArticle,
  unsaveArticle,
} = require('../controllers/articles');

const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});

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
}), saveArticle);

router.delete('/:articleId', validateId, unsaveArticle);

module.exports = router;
