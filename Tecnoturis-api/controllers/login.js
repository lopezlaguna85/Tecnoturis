const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const axios = require('axios')

loginRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, password } = body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? null
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    const userHotels = {
      username: process.env.USERHOTEL,
      password: process.env.PASSHOTEL
    };
    const { data } = await axios.post('https://dev.tecnoturis.es/api-rest/hotels/api/v1/auth/login', userHotels)

    response.send({
      name: user.name,
      username: user.username,
      hotelToken: `Bearer ${data._data.token}`,
      token
    })
  } catch (e) {
    response.status(400).json({ e })
  }
})

module.exports = loginRouter
