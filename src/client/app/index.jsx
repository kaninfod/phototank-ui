import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import store from './store';

import CatalogPhotos from './pages/photos/catalog';
import SearchPhotos from './pages/photos/search';
import App from './pages/app';
import Home from './pages/home';
import Catalogs from './pages/catalogs';
import Albums from './pages/albums';
import PhotoCard from './components/card/photo';
import Bucket from './components/card/bucket';
import Login from './pages/login';

injectTapEventPlugin();
const app = document.getElementById('app');
const history = createBrowserHistory();

// function requireAuth(nextState, replace) {
//   if (!sessionStorage.jwt) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname },
//     });
//   }
// }

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    !!sessionStorage.jwt ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
);

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter history={history}>
        <div>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={App}/>
          <PrivateRoute exact={true} path="/photos" component={SearchPhotos}/>
          <PrivateRoute path="/catalog/:id/photos/" component={CatalogPhotos}/>
          <Route path="/albums" component={Albums}/>
          <PrivateRoute path="/catalogs" component={Catalogs}/>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>, app);
