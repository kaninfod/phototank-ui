
import '../../stylesheets/photo-card/card.scss'
import React from 'react';
import AppConstants from '../../constants/constants.js'
import Draggable, {DraggableCore} from 'react-draggable';
import {Header} from './../photoCard/header.jsx'



export default class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this._setState = this._setState.bind(this);

    this.state = {
      hidden: true
    }
  }

  componentWillMount() {
    BucketStore.addChangeListener(this._setState)

    if (this.state.photoId) {
      AppActions.loadPhoto({

      });
    }
  }

  componentWillUnmount() {
    BucketStore.removeChangeListener(this._setState)
  }

  _setState() {
    var data = BucketStore.getBucket()
    this.setState({

    })
  }



  hide() {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    if ( this.state.hidden) {return <FloatingButton onHide={this.hide}/>}

    return (
      <Draggable handle=".header">
        <div className="card pt-card upper-right show">
          <div className="pt-widget">
            <Header handleClose={this.hide} title="Bucket"/>
            <div className="pt-widget content">
            </div>

          </div>
        </div>
     </Draggable>
    )
  }
}

const FloatingButton = (props) => {
  return (
    <a onClick={props.onHide} className="fixed-action-button btn-floating waves-effect waves-light">
      <i className="material-icons">
        info
      </i>
    </a>
  )
}
