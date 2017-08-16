import axios from 'axios'
import { UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
import { me } from './user'

export function signinUser({username, password}) {

  return function (dispatch) {

    // submit username and password to server
    const request = axios.post('/signin', {username, password})
    request
      .then(response => {
        // -Save the JWT token
        localStorage.setItem('token', response.data.token)

        // -if request is good, we need to update state to indicate user is authenticated
        dispatch({type: AUTH_USER})
        dispatch(me())
      })

      // If request is bad...
      // -Show an error to the user
      .catch(() => {
        dispatch(authError('bad login info'))
      })

  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export function signupUser({username, password, passwordConfirmation}) {
  return function (dispatch) {
    axios.post('/signup', {username, password, passwordConfirmation})
      .then(response => {
        dispatch({type: AUTH_USER})
        dispatch(me())
        localStorage.setItem('token', response.data.token)
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get('/getMessage', {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}