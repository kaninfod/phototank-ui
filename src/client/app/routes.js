import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Photos from './pages/photos';
import App from './pages/app';
import Home from './pages/home'
import Catalogs from './pages/catalogs'
import Albums from './pages/albums'
import PhotoCard from './components/card/photo'
import Bucket from './components/card/bucket'
import Login from './components/login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route exact={true} path="/photos" component={Photos} onEnter={requireAuth}/>
    <Route path="/photos/:context/:id" component={Photos} onEnter={requireAuth}/>
    <Route path="/albums" component={Albums} onEnter={requireAuth}/>
    <Route path="/catalogs" component={Catalogs} onEnter={requireAuth}/>

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
