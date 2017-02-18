import React from 'react';
import AuthStore from '../stores/authStore.js'
import AppActions from '../actions/actions.js'
import { Router } from 'react-router';
import { browserHistory } from 'react-router';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this._setState = this._setState.bind(this);
    this.state = {

    }
  }

  componentWillMount() {
    AuthStore.addChangeListener(this._setState)
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._setState)
  }
  componentDidUpdate() {

    if (this.state.redirectUrl) {

    }
  }

  handleLogout() {
    AppActions.logout({ });
  }

  handleLogin() {
    AppActions.login({
      email: "example@mail.com",
      password: "123123123"
    });
  }

  _setState() {
    var _state = AuthStore.getState()
    if (!_state.loggedIn) {
      return this.setState({ error: true })
    }

    const { location } = this.props

    if (location.state && location.state.nextPathname) {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  render() {
    return (
      <div>
        <p>
          <a className="waves-effect waves-light btn" onClick={this.handleLogin}> Login </a>
        </p>
        <p>
          <a className="waves-effect waves-light btn" onClick={this.handleLogout}> Logout </a>
        </p>
      </div>

    )
  }
}
