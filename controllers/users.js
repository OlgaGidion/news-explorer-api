const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
    res.status(200).send({ token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new RequestError('Ошибка в данных'));
      return;
    }

    next(error);
  }
};

const getMyUser = async (req, res, next) => {
  try {
    const myUser = await User.findById(req.user._id);
    if (!myUser) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }

    res.status(200).send(myUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  getMyUser,
};
