import React from 'react';
import { Route, IndexRoute } from 'react-router';
import PhotoGrid from './components/photogrid/grid';
import Login from './components/login';
import App from './components/app';
import Home from './components/home'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/photos" component={PhotoGrid} onEnter={requireAuth}>
      
    </Route>
  </Route>
);

function requireAuth(nextState, replace) {
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
