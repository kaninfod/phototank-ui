
import React from 'react';
import { DefaultRoute, Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Photos from './routes/Photos.jsx'
import Login from './login.jsx'
import EnsureLoggedInContainer from './loginHelper.js'
export default class Root extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/login" component={Home}/>
      </Router>
    )
  }
}


const Home = () => <h1>Hello from Homeyada!</h1>
const Address = () => <h1>We are located at 555 Jackson St.</h1>
