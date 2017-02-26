import React from 'react';
import { connect } from "react-redux"
import '../../stylesheets/grid';
import Widget from './widget';
import lazyload from 'jquery-lazyload';
import AppConstants from '../../constants/constants.js'
import PhotoCard from '../card/photo'
import Bucket from '../card/bucket'
import { loadPhotos, clickPhoto, deletePhoto } from '../../actions/gridActions'
import { selectPhoto } from '../../actions/bucket'

@connect((store) => {
  return {
    photos:store.grid.get('photos').toJS(),
    nextPage: store.grid.get('nextPage'),
    loading: store.grid.get('loading'),
    selectedPhoto: store.grid.get('selectedPhoto'),
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
  }

  componentWillMount() {
    this.props.dispatch(loadPhotos(this.props.nextPage))
  }

  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('scroll', function(event) {
        this.handleScroll(event)
    }.bind(this));
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
        <div>
          { this.props.children }
        </div>
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
