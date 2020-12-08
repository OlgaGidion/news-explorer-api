const mongoose = require('mongoose');
const { Schema, ObjectId } = require('mongoose');
const validator = require('validator');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
    },
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('article', articleSchema);
