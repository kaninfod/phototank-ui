import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router';
import Header from './common/header';

@connect((store) => {
  return {

  };
})
class Home extends React.Component {
  render() {
    return (
      <div className="jumbotron">
      <Header></Header>
        <h1>Cat Book</h1>
        <p>the best way manage your cat collection.</p>
        <Link to="login" className="btn btn-primary btn-lg">log in as a test user</Link>
      </div>
    );
  }
}

export default Home;
