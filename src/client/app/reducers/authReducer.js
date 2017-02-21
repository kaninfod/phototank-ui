import AppConstants from '../constants/constants'
import { List, Map, fromJS } from 'immutable';


var init = {
  isLoggedIn: !!localStorage.authKey
}
const initialState = Map(fromJS(init))

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED': {
      localStorage.authKey = action.payload.auth_token
      return state
        .set('isLoggedIn', true)
        .set('authKey', action.payload.auth_token)
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('authKey')
      return state
        .set('isLoggedIn', action.payload.isLoggedIn)
        .set('authKey', null)
    }
    case 'IS_LOGGED_IN': {
      console.log(action);
      return state
        .set('isLoggedIn', action.payload.isLoggedIn)
        .set('authKey', action.payload.authKey)
    }
  }
  return state
}
