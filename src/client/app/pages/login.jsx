import React from 'react';
import { connect } from "react-redux";
// import { Router } from 'react-router';
// import { browserHistory } from 'react-router';
import { login, logout } from '../actions/actAuth'
import '../stylesheets/login'

@connect((store) => {
  return {
  };
})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this._setState = this._setState.bind(this);
    this.state = {
      email: "example@mail.com",
      password: "123123123"
    }
  }



  handleLogout() {
    this.props.dispatch(logout())
  }

  handleLogin() {
    console.log('LOGGER', this.props.history);
    this.props.dispatch(login({
      email: this.state.email,
      password: this.state.password
    }))
  }

  emailChanged() {  }

  passwordChanged() {  }

  // _setState() {
  //   var _state = AuthStore.getState()
  //   if (!_state.loggedIn) {
  //     return this.setState({ error: true })
  //   }
  //
  //   const { location } = this.props
  //
  //   if (location.state && location.state.nextPathname) {
  //     this.props.router.replace(location.state.nextPathname)
  //   } else {
  //     this.props.router.replace('/')
  //   }
  // }

  render() {
    return (

      <div class="row login-card">
        <div class="col s12 m6 ">
          <div class="card ">

            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="email"  value={this.state.email} onChange={this.emailChanged} type="text" class="validate"/>
                <label for="email">email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="password" value={this.state.password} onChange={this.passwordChanged} type="password" class="validate"/>
                <label for="password">Password</label>
              </div>
            </div>
            <div class="row">
              <button class="btn waves-effect waves-light" type="submit" onClick={this.handleLogin}>Login
               <i class="material-icons right">send</i>
             </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
