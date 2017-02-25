import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';


const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, app);
