const Article = require('../models/article');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMyArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

const saveArticle = async (req, res, next) => {
  try {
    const {
      keyword,
      title,
      description,
      date,
      source,
      link,
      image,
    } = req.body;

    const owner = req.user._id;
    const article = await Article.create({
      keyword,
      title,
      description,
      date,
      source,
      link,
      image,
      owner,
    });

    res.status(201).send(article);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new RequestError('Ошибка в данных'));
      return;
    }

    next(error);
  }
};

const unsaveArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).select('+owner');

    if (!article) {
      throw new NotFoundError('Нет статьи с таким id');
    }

    if (String(article.owner) !== req.user._id) {
      throw new ForbiddenError('Невозможно удалить чужую статью');
    }

    await Article.findByIdAndDelete(articleId);
    res.status(200).send({ message: 'Статья удалена' });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new RequestError('Невалидный id'));
      return;
    }

    next(error);
  }
};

module.exports = {
  getMyArticles,
  saveArticle,
  unsaveArticle,
};
