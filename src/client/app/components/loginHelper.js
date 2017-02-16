import React from 'react';
import AuthStore from '../stores/authStore.js'

class EnsureLoggedInContainer extends React.Component {


  componentWillMount() {
    console.log(AuthStore.getState());
    this.setState(AuthStore.getState())

    console.log(this.state);
    // if (!state.loggedIn) {
    //   // set the current url/path for future redirection (we use a Redux action)
    //   // then redirect (we use a React Router method)
    //   // dispatch(setRedirectUrl(currentURL))
    //   browserHistory.replace("/login")
    // }
  }

  render() {
    console.log(state.loggedIn);
    if (!state.loggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}