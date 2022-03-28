import React from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'

export default function LoginForm ({ handleSubmit, ...props }) {
  return (
    <Togglable buttonLabel={props.login?'Show Login':'Show Register'}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={props.username}
            name='Username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='Password'
            placeholder='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        {props.login?
          <button id='form-login-button'>
            Login
          </button>:
          <button id='form-login-button'>
            Register
          </button>
        }
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
