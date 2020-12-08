const Article = require('../models/article');
const RequestError = require('../errors/RequestError');

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({})
      .populate('owner');
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;
    const owner = req.user._id;
    const newArticle = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    });
    await Article.populate(newArticle, 'owner');
    res.status(201).send(newArticle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new RequestError('Ошибка в данных'));
      return;
    }

    next(error);
  }
};

module.exports = {
  getAllArticles,
  createArticle,
};
