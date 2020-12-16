const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    next(new NotAuthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
