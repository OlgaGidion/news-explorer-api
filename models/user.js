const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = async function f(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new NotAuthorizedError('Неправильная почта или пароль');
  }

  const arePasswordsMatched = await bcrypt.compare(password, user.password);
  if (!arePasswordsMatched) {
    throw new NotAuthorizedError('Неправильная почта или пароль');
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
