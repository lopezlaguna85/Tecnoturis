import axios from 'axios'

const baseUrl = '/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const register = async credentials => {
  const { data } = await axios.post('/users', credentials)
  return data
}

export default { login, register }
