import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Photos from './pages/photos';
import Login from './components/login';
import App from './pages/app';
import Home from './pages/home'
import PhotoCard from './components/card/photo'
import Bucket from './components/card/bucket'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/photos" component={Photos} onEnter={requireAuth}>

    </Route>
  </Route>
);

function requireAuth(nextState, replace) {
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}
