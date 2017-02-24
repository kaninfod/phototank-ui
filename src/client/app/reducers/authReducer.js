import AppConstants from '../constants/constants'
import { List, Map, fromJS } from 'immutable';


var init = {
  authorized: false
}
const initialState = Map(fromJS(init))

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED': {
      localStorage.authKey = action.payload.auth_token;
      return state
        .set('isLoggedIn', true)
        .set('authKey', action.payload.auth_token);
    }

    case 'LOGOUT': {
      window.localStorage.removeItem('authKey');
      return state
        .set('isLoggedIn', action.payload.isLoggedIn)
        .set('authKey', null);
    }

    case 'VALIDATE_TOKEN_FULFILLED': {
      return state.set('token', action.payload.token)
        .set('authorized', action.payload.authorized)
        .set('userName', action.payload.user_name)
        .set('email', action.payload.email)
        .set('avatar', action.payload.avatar);
    }
  }
  return state;
}
