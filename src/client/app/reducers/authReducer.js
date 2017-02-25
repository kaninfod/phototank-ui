import AppConstants from '../constants/constants'
import { List, Map, fromJS } from 'immutable';
import { browserHistory } from 'react-router'

var init = {
  authorized: false,
  session: !!sessionStorage.jwt
}
const initialState = Map(fromJS(init))

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN_SUCCESS': {
      browserHistory.push('/');
      return !!sessionStorage.jwt;
    }

    case 'LOG_OUT':
      browserHistory.push('/')
      return !!sessionStorage.jwt

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
