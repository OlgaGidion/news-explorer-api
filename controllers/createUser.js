const bcrypt = require('bcryptjs');
const User = require('../models/user');
const RequestError = require('../errors/RequestError');

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;

    const soltedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: soltedPassword,
      name,
    });

    res.status(201).send({ _id: newUser._id });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new RequestError('Пользователь с таким email уже существует'));
      return;
    }

    if (error.name === 'ValidationError') {
      next(new RequestError('Ошибка в данных'));
      return;
    }

    next(error);
  }
};

module.exports = { createUser };
