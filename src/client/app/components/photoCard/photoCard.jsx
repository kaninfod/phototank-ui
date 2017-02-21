import React from 'react';
import { connect } from "react-redux"
import AppConstants from '../../constants/constants.js'
import Draggable, {DraggableCore} from 'react-draggable';
import Buttons from './buttons'
import {getButtons} from './button.props.js'
import Info from './info.jsx'
import Rotate from './rotate.jsx'
import Albums from './albums.jsx'
import Comments from './comments.jsx'
import Tag from './tag.jsx'
import Map from './map.jsx'
import '../../stylesheets/photo-card/card.scss'
import { loadPhoto, setWidget, addToAlbum, rotatePhoto, addComment, likePhoto } from '../../actions/photoCardActions'

const components = {
  INFO:     Info,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  MAP:      Map,
  DELETE:   'Delete',
  LIKE:     'Like'
};

@connect((store) => {
  return {
    selectedWidget: store.photoCard.get('selectedWidget'),
    hidden: store.photoCard.get('hidden'),
    photoId: store.photoCard.get('photoId'),
    cardData: store.photoCard.get('cardData').toJS(),
  };
})
export default class PhotoCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleWidget = this.handleWidget.bind(this);
    this.rotatePhoto = this.rotatePhoto.bind(this);
    this.hide = this.hide.bind(this);
    this.addToAlbum  = this.addToAlbum.bind(this);
    this.addComment  = this.addComment.bind(this);
  }

  componentWillMount() {
    if (this.props.photoId) {
      this.props.dispatch(loadPhoto(this.props.photoId))
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.photoId != nextProps.photoId) {
      this.props.dispatch(loadPhoto(nextProps.photoId))
    }
  }

  handleWidget(e) {
    var action = e.target.dataset.widget
    if (action == 'DELETE') {
      // AppActions.deleteCardPhoto({
      //   photoId: this.state.photocard.photo.id
      // });
    } else if (action == 'LIKE') {
      this.props.dispatch(likePhoto(this.props.cardData.photo.id))
    } else {
      this.props.dispatch(setWidget(action))
    }
  }

  addToAlbum(albumId) {
    var payload = {
      photoId: this.props.cardData.photo.id,
      albumId: albumId
    }
    this.props.dispatch(addToAlbum(payload))
  }

  rotatePhoto(rotation) {
    var payload = {
      photoId: this.props.cardData.photo.id,
      rotation: rotation
    }
    this.props.dispatch(rotatePhoto(payload))
  }

  addComment(comment) {
    var payload = {
      photoId: this.props.cardData.photo.id,
      comment: comment
    }
    this.props.dispatch(addComment(payload))
  }

  hide() {
    this.setState({ hidden: !this.props.hidden })
  }

  likeState() {
    if (this.props.cardData.photo.like) { return "green" } else {return "blue-grey lighten-2"}
  }

  render() {
    if (!Object.keys(this.props.cardData).length === 0 || this.props.hidden) {return <FloatingButton onHide={this.hide}/>}
    const buttons = getButtons({likeState: this.likeState()})
    if (!['INFO', 'MAP'].includes(this.props.selectedWidget)) {
      buttons.vert = []
    }

    const widgetHandlers = {
      ROTATE:   this.rotatePhoto,
      ALBUMS:   this.addToAlbum,
      COMMENTS: this.addComment,
      HIDE:     this.hide
    }

    const WidgetType = components[this.props.selectedWidget];

    return (
      <Draggable handle=".header">
        <div className="card pt-card upper-right show">
          <WidgetType cardData={this.props.cardData} widgetHandlers={widgetHandlers}/>
          <Buttons buttons={buttons}
            widget={this.props.selectedWidget}
            handleWidget={this.handleWidget}/>
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
