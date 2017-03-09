import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router';
import { connect } from "react-redux";
import { login, logout } from '../../actions/actAuth'
@connect((store) => {
  return {
    logged_in: store.auth
  };
})
class Header extends React.Component {
  constructor(props) {
    super();
    this.logout = this.logout.bind(this);
  }


  logout(event) {
    event.preventDefault();
    this.props.dispatch(logout())
  }


  render() {
      console.log(this.props.logged_in);
      if (this.props.logged_in) {
        return (
          <div>
            <h1>you are logged in</h1>
            <a href="#" onClick={this.logout}>log out</a>
          </div>
        )
      } else {
        return (
          <div>
            <h1>you are not logged in</h1>
            <Link to="/login" activeClassName="active">
              log in
            </Link>
          </div>
        )
      }

}
}
export default Header;
