const bcrypt = require('bcrypt')
const hotelsRouter = require('express').Router()
const axios = require('axios')

hotelsRouter.get('/', async (request, response) => {
  try {
    const { headers } = request
    const { authorization } = headers
    const config = {
      headers: {
        Authorization: authorization
      }
    }
    
    const { data } = await axios.get('https://dev.tecnoturis.es/api-rest/hotels/api/v1/hotels', config)
    response.json(data)
  } catch (e) {
    response.json(e)
  }
})

hotelsRouter.get('/:id', async (request, response) => {
  try {
    const { headers } = request
    const { authorization } = headers
    const config = {
      headers: {
        Authorization: authorization
      }
    }

    const { id } = request.params

    const { data } = await axios.get(`https://dev.tecnoturis.es/api-rest/hotels/api/v1/hotels/${id}`, config)
    response.json(data)
  } catch (e) {
    response.json(e)
  }
})

module.exports = hotelsRouter
