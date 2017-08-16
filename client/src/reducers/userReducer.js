import { FETCH_ME } from '../actions/types'

export default function userReducer(state = {user: {}}, action) {
  switch (action.type) {
    case FETCH_ME:
      return {...state, user: action.payload}
    default:
      return state
  }
}

