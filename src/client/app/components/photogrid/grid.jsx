import React from 'react';
import { connect } from "react-redux"
import Widget from './widget.jsx';
import lazyload from 'jquery-lazyload';
import AppConstants from '../../constants/constants.js'

import {loadPhotos, clickPhoto, deletePhoto, selectPhoto} from '../../actions/gridActions'

@connect((store) => {
  return {
    delete: store.grid.delete,
    photos: store.grid.photos,
    nextPage: store.grid.nextPage,
    bucket: store.grid.bucket,
    loading: store.grid.loading,
    selectedPhoto: store.grid.selectedPhoto,
    bucket: store.grid.bucket,
  };
})
export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.loading = true
    // this.state = {
    //   photos: [],
    //   selectedPhoto: this.props.selectedPhoto,
    //   bucket: [],
    //   nextPage: "/api/photos.json?page=1",
    //   offset: 800,
    //   loading: true,
    //   //showCard: @props.showCard
    // }
  }

  componentWillMount() {
    this.props.dispatch(loadPhotos(this.props.nextPage))
  }

  componentDidUpdate() {
    $(window).scroll(event, function() {this.handleScroll(event)}.bind(this))
    $('.lazy').lazyload()
  }

  handleSelect(photoId) {
    console.log('select: ', photoId);
    this.props.dispatch(selectPhoto(photoId))
  }

  handleDelete(photoId) {
    this.props.dispatch(deletePhoto(photoId))
  }

  handleClick(photoId) {
    this.props.dispatch(clickPhoto(photoId))
  }

  handleScroll(event) {
    var scrollPosition = $('.loadMore').offset().top  - ($(window).height() + $(window).scrollTop() + this.props.offset)
    if (scrollPosition < 0 && this.loading && this.props.nextPage != undefined){
      this.loading = false
      this.props.dispatch(loadPhotos(this.props.nextPage))
    }
  }

  render() {

    return (
      <div className="photos-component">
        <div className="row photogrid" onScroll={this.handleScroll}>
          {this.props.photos.map(function(photo, i){
            return <Widget key={photo.id} photo={photo} handleClick={this.handleClick}
              handleSelect={this.handleSelect} handleDelete={this.handleDelete}/>
          }.bind(this))}
        </div>
        <div className="row loadMore"></div>
        {this.loading = this.props.loading}
      </div>
      );
  }
}

Grid.defaultProps = {
  photos: [],
  offset: 800,
  nextPage: "/api/photos.json?page=1",
};
