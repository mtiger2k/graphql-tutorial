import axios from 'axios'
import { FETCH_ME } from './types'

export function me() {
  return function (dispatch) {
    axios.get('/me', {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_ME,
          payload: response.data
        })
      })
  }
}