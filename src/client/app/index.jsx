import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import Root from './components/root.jsx';
import { Provider } from 'react-redux';
import store from './store';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
      <Root/>
  </Provider>, app);
