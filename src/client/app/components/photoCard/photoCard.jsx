
import '../../stylesheets/photo-card/card.scss'
import React from 'react';
import CardStore from '../../stores/cardStore.js'
import AppActions from '../../actions/actions.js'
import AppConstants from '../../constants/constants.js'
import Draggable, {DraggableCore} from 'react-draggable';
import Buttons from './buttons.jsx'
import {getButtons} from './button.props.js'
import Info from './info.jsx'
import Rotate from './rotate.jsx'
import Albums from './albums.jsx'
import Comments from './comments.jsx'
import Tag from './tag.jsx'
import Map from './map.jsx'

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


export default class PhotoCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleWidget = this.handleWidget.bind(this);
    this.rotatePhoto = this.rotatePhoto.bind(this);
    this.hide = this.hide.bind(this);
    this.addToAlbum  = this.addToAlbum.bind(this);
    this.addComment  = this.addComment.bind(this);
    this.state = {
      selectedWidget:'TAG',
      photoId: this.props.photoId,
      hidden: true
    }
  }

  componentWillMount() {
    CardStore.addListener('change', function(){
      var data = CardStore.getCard()
      this.setState({
        selectedWidget: data.widget,
        photocard: data.data,
        hidden: data.hidden
      })
    }.bind(this));


    if (this.state.photoId) {
      AppActions.loadPhoto({
        photoId: this.state.photoId
      });
    }
  }


  handleWidget(e) {
    var action = e.target.dataset.widget
    if (action == 'DELETE') {
      AppActions.deleteCardPhoto({
        photoId: this.state.photocard.photo.id
      });
    } else if (action == 'LIKE') {
      AppActions.likePhoto({
        photoId: this.state.photocard.photo.id
      });
    } else {
      AppActions.setCardWidget({
        widget: action
      });
    }
  }

  addToAlbum(albumId) {
    AppActions.addToAlbum({
      photoId: this.state.photocard.photo.id,
      albumId: albumId
    });
  }

  rotatePhoto(rotation) {
    AppActions.rotatePhoto({
      photoId: this.state.photocard.photo.id,
      rotation: rotation
    });
  }

  addComment(comment) {
    AppActions.addComment({
      photoId: this.state.photocard.photo.id,
      comment: comment
    });
  }

  hide() {
    this.setState({ hidden: !this.state.hidden })
  }

  likeState() {
    if (this.state.photocard.photo.like) { return "green" } else {return "blue-grey lighten-2"}
  }

  render() {
    if (!this.state.photocard || this.state.hidden) {return <FloatingButton onHide={this.hide}/>}
    const buttons = getButtons({likeState: this.likeState()})
    if (!['INFO', 'MAP'].includes(this.state.selectedWidget)) {
      buttons.vert = []
    }

    const widgetHandlers = {
      ROTATE:   this.rotatePhoto,
      ALBUMS:   this.addToAlbum,
      COMMENTS: this.addComment,
      HIDE:     this.hide
    }

    const WidgetType = components[this.state.selectedWidget];

    return (
      <Draggable handle=".header">
        <div className="card pt-card upper-right show">
          <WidgetType photocard={this.state.photocard} widgetHandlers={widgetHandlers}/>
          <Buttons buttons={buttons}
            photocard={this.state.photocard}
            widget={this.state.selectedWidget}
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
