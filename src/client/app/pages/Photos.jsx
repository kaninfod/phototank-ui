import React from 'react';
import { connect } from "react-redux";
import Grid from '../components/photogrid/grid';
import PhotoCard from '../components/card/photo';
import Bucket from '../components/card/bucket';
import BottomPanel from '../components/bottom-panel';
import { selectPhoto } from '../actions/actBucket';
import { loadPhotos,
  clickPhoto,
  deletePhoto,
  getNextPage,
  getPhotos,
  getCountries } from '../actions/actGrid'

@connect((store) => {
  return {
    selectedPhoto: store.grid.get('selectedPhoto'),
    loading: store.grid.get('loading'),
    lastPage: store.grid.getIn(['pagination', 'last_page']),
    photos: store.grid.get('photos'),
    countries: store.grid.get('countries').toJS(),
    photosBucket: store.bucket.getIn(['data', 'bucket']).toJS(),
    searchParams: store.grid.get('searchParams').toJS(),
  };
})
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.hideBucket = this.hideBucket.bind(this);
    this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
    this.removeBucketPhoto = this.removeBucketPhoto.bind(this);
    this.getPhotos = this.getPhotos.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      hidden: true,
    };
  };

  componentWillMount() {
    this.props.dispatch(getCountries());
    this.props.dispatch(getPhotos({
      context: this.props.params.context,
      contextId: this.props.params.id,
      change: [],
      searchParams: this.props.searchParams
    }));
  }

  hideBucket() {
    this.setState({ hidden: !this.state.hidden });
  }

  removeBucketPhoto(e) {
      this.props.dispatch(selectPhoto(e.target.dataset.photoid))
  }

  handleInfiniteScroll() {
    this.props.dispatch(getPhotos({
      context:this.props.params.context,
      contextId: this.props.params.id,
      searchParams: this.props.searchParams
    }));
  }

  getPhotos(key, value) {
    this.props.dispatch(
      getPhotos(
        {
          change: [
            { key: key, value: value},
            { key: 'page', value: 1},
          ],
          context:this.props.params.context,
          searchParams: this.props.searchParams
        }
      )
    );
  }

  handleSelect(photoId) {
    this.props.dispatch(selectPhoto(photoId))
  }

  handleDelete(photoId) {
    this.props.dispatch(deletePhoto(photoId))
  }

  handleClick(photoId) {
    this.props.dispatch(clickPhoto(photoId))
  }

  render () {
    var searchParams = this.props.searchParams

    const photoActions = {
      DELETE: this.handleDelete,
      SELECT: this.handleSelect,
      CLICK:  this.handleClick ,
      SCROLL: this.handleInfiniteScroll,
    }

    return (
      <div>
        <Grid
          type="freeform"
          searchParams={searchParams}
          photos={this.props.photos}
          lastPage={this.props.lastPage}
          loading={this.props.loading}
          photoActions={photoActions}
          >
          <PhotoCard/>
          <Bucket
            hidden={this.state.hidden}
            onHideBucket={this.hideBucket}
            onRemovePhoto={this.removeBucketPhoto}/>
          <BottomPanel
            photos={this.props.photosBucket}
            countries={this.props.countries}
            searchParams={searchParams}
            getPhotos={this.getPhotos}
            onRemovePhoto={this.removeBucketPhoto}
            onShowBucket={this.hideBucket}
          />
        </Grid>

      </div>
    );
  }
}

// function getSearchParams(props) {
//   var params = {
//     page: props.page,
//     startdate: props.startdate,
//     country: props.country,
//     like: props.like,
//     tags: props.tags,
//     direction: props.direction,
//   }
//   return params;
// }

export default Photos;
