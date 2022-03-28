import React from 'react'
import Togglable from './Togglable.js'

const Hotel = ({ hotel }) => {

  return (
    <li className='note'>
      Name: {hotel.name} <p/>
      ID: {hotel.id} <p/>
      Rating: {hotel.hotelRating}
      <Togglable buttonLabel='Show Hotel'>
        Address: {hotel.address1} <p/>
        City: {hotel.city} <p/>
        Description: {hotel.shortDescription}
      </Togglable>
    </li>
  )
}

export default Hotel
