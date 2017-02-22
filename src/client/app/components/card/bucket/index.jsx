import '../../../stylesheets/photo-card/card.scss';
import '../../../stylesheets/bucket';
import React from 'react';
import { connect } from "react-redux"
import AppConstants from '../../../constants/constants';
import Draggable, { DraggableCore } from 'react-draggable';
import { getButtons } from './bucket-button.props';
import { Buttons, Bucketgrid, Rotate, Albums, Comments, Tag } from '../widgets';
import { loadBucket, loadAlbums, setWidget } from '../../../actions/bucket';


const components = {
  BUCKETGRID:   Bucketgrid,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  DELETE:   'Delete',
  LIKE:     'Like'
};

@connect((store) => {
  return {
    selectedWidget: store.bucket.get('selectedWidget'),
    data: store.bucket.get('data').toJS(),
  };
})
export default class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.handleWidget = this.handleWidget.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      hidden: true,
    };
  };

  componentWillMount() {
    this.props.dispatch(loadBucket());
    this.props.dispatch(loadAlbums());
  }

  hide() {
    this.setState({ hidden: !this.state.hidden });
  }

  deletePhotos() {}

  likePhotos() {}

  likeState() { }

  rotatePhotos() {}

  addToAlbum() {}

  addComment() {}

  handleWidget(e) {
    var action = e.target.dataset.widget
    console.log(this.props);
    if (action == 'DELETE') {
      // AppActions.deleteCardPhoto({
      //   photoId: this.state.photocard.photo.id
      // });
    } else if (action == 'LIKE') {
      this.props.dispatch(likePhoto())
    } else {
      this.props.dispatch(setWidget(action))
    }
  }

  render() {
    if (this.state.hidden) { return <FloatingButton onHide={this.hide}/> }
    const props = this.props
    const buttons = getButtons({ likeState: this.likeState() });
    const WidgetType = components[props.selectedWidget];
    const widgetHandlers = {
      ROTATE:   this.rotatePhoto,
      ALBUMS:   this.addToAlbum,
      COMMENTS: this.addComment,
      HIDE:     this.hide,
    };

    return (
      <Draggable handle=".header">
        <div className="card pt-card upper-right show">
            <WidgetType data={this.props.data} widgetHandlers={widgetHandlers}/>
            <Buttons buttons={buttons}
              widget={this.props.selectedWidget}
              handleWidget={this.handleWidget}/>
          </div>
     </Draggable>
   );
  }
}

const FloatingButton = (props) => {
  return (
    <a onClick={props.onHide} className="fixed-action-button btn-floating waves-effect waves-light">
      <i className="material-icons">
        info
      </i>
    </a>
  );
};
