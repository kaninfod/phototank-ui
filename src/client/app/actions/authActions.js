import AppConstants from '../constants/constants'
import { authenticate, authValidateToken } from './api-calls';




//TODO login via api, on success store token to session and then dispatch to reducer to set success

export function loginSuccess() {
  return {type: 'LOG_IN_SUCCESS'}
}

export function login(payload) {
  return authenticate(payload);
}

export function logout(payload) {
  return {
      type: 'LOGOUT',
      payload: {
        isLoggedIn: false,
        authKey: null,
      },
    };
}

export function isLoggedIn() {
  return authValidateToken();
}
