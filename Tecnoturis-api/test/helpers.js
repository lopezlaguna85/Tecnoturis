const supertest = require('supertest')
const { app } = require('../index.js')
const User = require('../models/User')

const api = supertest(app)

const getAllUsers = async () => {
  const usersDB = await User.find({})
  const users = usersDB.map(user => user.toJSON())

  return users
}

module.exports = {
  api,
  getAllUsers
}
