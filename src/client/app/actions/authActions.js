import AppConstants from '../constants/constants'

var headers = new Headers({
  'Authorization': localStorage.authKey
})


export function login(payload) {
  var url = "/api/authenticate"
  return function(dispatch) {
    headers.append("Content-Type", "application/json")
    var request = new Request(url, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(payload)
    });
    fetch(request)
      .then((response) => {
        dispatch({type: "LOGIN", payload: response.json()})
      })
      .catch((err) => {
        dispatch({type: "LOGIN", payload: err})
      })
  }
}

export function logout(payload) {
  return {
    type: 'LOGOUT',
    payload: {
      isLoggedIn: false,
      authKey: null
    }
  }
}

export function isLoggedIn() {
  console.log(localStorage.getItem("authKey") !== null);
  var authKey = null
  var isLoggedIn = false

  if (localStorage.getItem("authKey") !== null ) {
    authKey = localStorage.authKey
    isLoggedIn = true
  }
  return {
    type: 'IS_LOGGED_IN',
    payload: {
      isLoggedIn: isLoggedIn,
      authKey: authKey
    }
  }
}
