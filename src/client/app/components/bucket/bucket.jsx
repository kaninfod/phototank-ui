
import '../../stylesheets/photo-card/card.scss'
import React from 'react';
import BucketStore from '../../stores/bucketStore.js'
import AppActions from '../../actions/actions.js'
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
