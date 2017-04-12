import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import FAB from '../components/fixedActionButton/fab';

@connect((store) => {
  return {
    loggedIn: store.auth
  };
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFABClick = this.handleFABClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      showFABChildren: false,
    };
  }

  handleFABClick() {
    const val = !this.state.showFABChildren
    this.setState({ showFABChildren: val });
  }

  handleLogout() {
    console.log('LOGOUT');
    this.setState({ showFABChildren: !this.state.showFABChildren });
  }

  render() {

    return (
      <div>
        <FAB show={this.props.loggedIn ? true : false} location={this.props.history.location}>
          <ul>
            <li><a onClick={this.handleLogout} class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
          </ul>
        </FAB>
        {this.props.children}
      </div>
    );
  }
}



export default App;
