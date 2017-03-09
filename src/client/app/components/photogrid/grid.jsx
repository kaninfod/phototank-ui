import React from 'react';
import '../../stylesheets/grid';
import Zoombox from './zoombox';
import Widget from './widget';
import lazyload from 'jquery-lazyload';
import { selectPhoto } from '../../actions/actBucket';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.showZoombox = this.showZoombox.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.hideZoombox = this.hideZoombox.bind(this);
    this.loading = true;
    this.state = {
      zoomboxOpen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('scroll', function (event) {
        this.handleScroll(event);
      }.bind(this));
    $('.lazy').lazyload();
  }

  hideZoombox() {
    this.setState({ zoomboxOpen: false });
  }

  showZoombox(photoId) {
    var index = this.props.photos.findIndex(obj => {
      return obj.get('id') === photoId;
    });
    this.setState({ zoomPhotoId: photoId, zoomboxOpen: true, index: index });
  }

  handleScroll(event) {
    var scrollPosition = $('.loadMore').offset().top
                          - ($(window).height()
                          + $(window).scrollTop()
                          + this.props.offset);
    if (scrollPosition < 0 && this.loading && !this.props.lastPage) {
      this.loading = false;
      this.props.photoActions.SCROLL();
    }
  }

  render() {
    const props = this.props;
    const actions = props.photoActions;
    return (
      <div className="photos-component">
        <Zoombox
          photos={this.props.photos}
          photoId={this.state.zoomPhotoId}
          isOpen={this.state.zoomboxOpen}
          index={this.state.index}
          hideZoombox={this.hideZoombox}
          />

        <div className="row photogrid" onScroll={this.handleScroll}>
          {props.photos.map(photo => {
            return <Widget
              key={photo.get('id')}
              photo={photo}
              handleClick={actions.CLICK}
              handleSelect={actions.SELECT}
              handleDelete={actions.DELETE}
              showZoombox={this.showZoombox}/>;
          })}
        </div>
        <div className="row loadMore"></div>
        <div>
          { props.children }
        </div>
        {this.loading = props.loading}
      </div>
    );
  }
}

Grid.defaultProps = {
  photos: [],
  offset: 600,

};
