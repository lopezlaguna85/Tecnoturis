import axios from 'axios'
const baseUrl = '/hotels'

let token = null
let hotelToken = null

const setToken = (newToken, newHotelToken) => {
  token = `Bearer ${newToken}`
  hotelToken = newHotelToken
}

const getAll = () => {
  const config = {
    headers: {
      Authorization: hotelToken
    }
  }
  

  const request = axios.get(baseUrl, config)
  
  return request.then(res => res.data)
}

const byId = (id) => {
  const config = {
    headers: {
      Authorization: hotelToken
    }
  }

  const request = axios.get(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, byId, setToken }
