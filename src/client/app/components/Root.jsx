
import React from 'react';
import { DefaultRoute, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Photos from './routes/Photos.jsx'
import Login from './login.jsx'
import store from "../store"


export default class Root extends React.Component {
  constructor(props) {
     super(props);
     this.requireAuth = this.requireAuth.bind(this);
   }

  requireAuth(nextState, replace ) {
    var isLoggedIn = store.getState().auth.get('isLoggedIn')
    if (!isLoggedIn) {
      replace({
        pathname: 'login',
        state: { nextPathname: nextState.location.pathname }
      })
    } else {

    }
  }

  render() {
    return (

      <Router history={browserHistory}>
        <Route path="/" component={Photos} onEnter={this.requireAuth}/>
        <Route path="login" component={Login}/>
      </Router>
    )
  }
}
