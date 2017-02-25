
import React from 'react';
import { DefaultRoute, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Photos from './routes/Photos.jsx'
import Login from './login.jsx'
import store from "../store"
import { connect } from "react-redux";
import { isLoggedIn } from '../actions/authActions'


@connect((store) => {
  return {
      authorized: store.auth.get('authorized')
  };
})
export default class Root extends React.Component {
  constructor(props) {
     super(props);
     this.requireAuth = this.requireAuth.bind(this);
   }

   componentWillMount() {
     this.props.dispatch(isLoggedIn());
   }

  requireAuth(nextState, replace ) {
    console.log('Authorized', this.props.authorized);
    if (this.props.authorized) {
      replace({
        pathname: 'login',
        state: { nextPathname: nextState.location.pathname }
      })
    } else {

    }
  }

  // shouldComponentUpdate() {
  //   if (this.props.authorized == undefined) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    console.log('render router');

    return (
      <Router history={browserHistory}>
        <Route path="/" component={Photos} onEnter={this.requireAuth}/>
        <Route path="login" component={Login}/>
      </Router>
    )
  }
}


// const routes = (props) => {
//   return (
//
//   )
// }
