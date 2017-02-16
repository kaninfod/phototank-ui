import React from 'react';
import Widget from './widget.jsx';
import lazyload from 'jquery-lazyload';
import GridStore from '../../stores/gridStore.js'
import AppActions from '../../actions/actions.js'
import AppConstants from '../../constants/constants.js'

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      photos: [],
      selectedPhoto: this.props.selectedPhoto,
      bucket: [],
      nextPageURL: "/api/photos.json?page=1",
      offset: 800,
      loading: true,
      //showCard: @props.showCard
    }
  }

  componentWillMount() {
    GridStore.addListener('change', function(){
      this.loadPhotos()
    }.bind(this));

    AppActions.loadPhotos({
      url: this.state.nextPageURL
    });
  }

  componentDidUpdate() {
    $(window).scroll(event, function() {this.handleScroll(event)}.bind(this))
    $('.lazy').lazyload()
  }

  extractURL(string){
    var url = $('<div/>').html(string).find(".next_page").attr('href')
    url = '/api'.concat(url)
    console.log(url);
    return url
  }

  loadPhotos() {
    var gridData = GridStore.getGrid()
    this.setState({
      photos: gridData.photos,
      nextPageURL: this.extractURL(gridData.pagi),
      loading: true,
      bucket: gridData.bucket,
      selectedPhoto: gridData.selectedPhoto
    })
  }

  handleSelect(photoId) {
    AppActions.bucketPhoto({
      photoId: photoId
    });
  }

  handleDelete(photoId) {
    AppActions.deletePhoto({
      photoId: photoId
    });
  }

  handleClick(photoId) {
    AppActions.selectPhoto({
      photoId: photoId
    });

  }

  handleScroll(event) {
    var scrollPosition = $('.loadMore').offset().top  - ($(window).height() + $(window).scrollTop() + this.state.offset)
    if (scrollPosition < 0 && this.state.loading && this.state.nextPageURL != undefined){
      this.setState({loading: false})
      AppActions.loadPhotos({
        url: this.state.nextPageURL
      });
    }
  }

  render() {
    return (
      <div className="photos-component">
        <div className="row photogrid" onScroll={this.handleScroll}>
          {this.state.photos.map(function(photo, i){
            return <Widget key={photo.id} photo={photo} handleClick={this.handleClick}
              handleSelect={this.handleSelect} handleDelete={this.handleDelete}/>
          }.bind(this))}
        </div>
        <div className="row loadMore"></div>
      </div>
      );
  }
}

Grid.defaultProps = {
  photos: []
};
