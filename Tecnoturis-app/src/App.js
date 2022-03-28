import React, { useState, useEffect } from 'react'
import Hotel from './components/Hotel'
import Notification from './components/Notification'
import hotelService from './services/hotels'
import loginService from './services/login'
import LoginForm from './components/LoginForm.js'
import FilterForm from './components/FilterForm.js'

const App = () => {
  const [hotels, setHotels] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hotelId, setHotelId] = useState('')
  const [stars, setStars] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedHotelAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      hotelService.setToken(user.token, user.hotelToken)
    }
  }, [])

  useEffect(() => {
    hotelService.getAll().then(res => {
      setHotels(res._data)
    })
  }, [])

  const handleLogout = () => {
    setUser(null)
    hotelService.setToken(null, null)
    window.localStorage.removeItem('loggedHotelAppUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedHotelAppUser', JSON.stringify(user)
      )

      hotelService.setToken(user.token, user.hotelToken)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleFilter = async (event) => {
    event.preventDefault()

    try {
      if (hotelId && hotelId !== '') {
        hotelService.byId(hotelId).then(res => {
          let filterHotel = []
          filterHotel = filterHotel.concat(res._data)
          setHotels(filterHotel)
        })
      } else if (stars && stars !== '') {
        const filterHotels = hotels.filter(hotel => Number(hotel.hotelRating) === Number(stars))
        setHotels(filterHotels)
      } else {
        hotelService.getAll().then(res => {
          setHotels(res._data)
        })
      }

    } catch (e) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      const newUser = await loginService.register({
        username,
        password
      })
      const user = await loginService.login({
        username: newUser.username,
        password
      })

      window.localStorage.setItem(
        'loggedHotelAppUser', JSON.stringify(user)
      )

      hotelService.setToken(user.token, user.hotelToken)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Hotels</h1>

      <Notification message={errorMessage} />

      {
        user
          ?
          <div>
            <div>
              <button onClick={handleLogout}>
                {user.username} LogOut
              </button>
            </div>
            <FilterForm
              name={hotelId}
              stars={stars}
              handleIdChange={
                ({ target }) => setHotelId(target.value)
              }
              handleStarsChange={
                ({ target }) => setStars(target.value)
              }
              handleSubmit={handleFilter}
            />
            <ul>
              {hotels.map((hotel, i) =>
                <Hotel
                  key={i}
                  hotel={hotel}
                />
              )}
            </ul>
          </div>
          : <>
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={
                  ({ target }) => setUsername(target.value)
                }
                handlePasswordChange={
                  ({ target }) => setPassword(target.value)
                }
                login={true}
                handleSubmit={handleLogin}
              />
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={
                  ({ target }) => setUsername(target.value)
                }
                handlePasswordChange={
                  ({ target }) => setPassword(target.value)
                }
                login={false}
                handleSubmit={handleRegister}
              />
            </>
      }
    </div>
  )
}

export default App
