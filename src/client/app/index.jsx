import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

injectTapEventPlugin();
const app = document.getElementById('app');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>, app);
