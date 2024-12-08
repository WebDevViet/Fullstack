const mongoose = require('mongoose')

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: String,
    email: String,
    city: String
  })
)

module.exports = User
