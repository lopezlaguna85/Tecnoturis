import React from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'

export default function FilterForm ({ handleSubmit, ...props }) {
  return (
    <Togglable buttonLabel={'Show Filter'}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={props.hotelId}
            name='ID'
            placeholder='ID'
            onChange={props.handleIdChange}
          />
        </div>
        <div>
          <input
            type='text'
            value={props.stars}
            name='Stars'
            placeholder='Stars'
            onChange={props.handleStarsChange}
          />
        </div>
        <button id='form-filter-button'>
          Search
        </button>
      </form>
    </Togglable>
  )
}

FilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string
}
