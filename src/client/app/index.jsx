import React from 'react';
import { DefaultRoute, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import AuthStore from './stores/authStore.js'
import Root from './components/root.jsx'
import Photos from './components/routes/Photos.jsx'
import Login from './components/login.jsx'

var requireAuth = function(nextState, replace ) {
  if (!AuthStore.isLoggedIn()) {
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname }
    })
  } else {
    console.log('lets go');
  }
}

var callback = function( ) {
  return AuthStore.isLoggedIn()
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Photos} onEnter={requireAuth}></Route>
    <Route path="/login" component={Login}></Route>
  </Router>
),document.getElementById('app'));


// ReactDOM.render(<Root/>, document.getElementById('app'))

// $(document).ready(function () {
//   ReactDOM.render( <Router/>,document.getElementById('app'));
// });
