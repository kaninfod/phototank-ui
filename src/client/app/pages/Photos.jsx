import React from 'react';
import { connect } from "react-redux";
import Grid from '../components/photogrid/grid';
import PhotoCard from '../components/card/photo';
import Bucket from '../components/card/bucket';
import BottomPanel from '../components/bottom-panel';
import { selectPhoto } from '../actions/bucket';
import { getNextPage, updateSearchParams, getCountries } from '../actions/gridActions'

@connect((store) => {
  return {
    photosGrid: store.grid.get('photos').toJS(),
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
    this.updateSearchParams = this.updateSearchParams.bind(this)
    this.state = {
      hidden: true,
    };
  };

  componentWillMount() {
    this.props.dispatch(getCountries());
    this.props.dispatch(updateSearchParams({
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
    this.props.dispatch(updateSearchParams({
      change: [],
      searchParams: this.props.searchParams
    }));
    // this.props.dispatch(getNextPage(this.props.searchParams));
  }

  updateSearchParams(key, value) {
    this.props.dispatch(updateSearchParams({
      change: [
        { key: key, value: value},
        { key: 'page', value: 1},
      ],
      searchParams: this.props.searchParams
    }));
  }

  render () {
    var searchParams = this.props.searchParams

    return (
      <div>

        <Grid
          searchParams={searchParams}
          onNextPage={this.handleInfiniteScroll}
          photos={this.props.photosGrid}
          >
          <PhotoCard/>
          <Bucket
            hidden={this.state.hidden}
            onHideBucket={this.hideBucket}
            onRemovePhoto={this.removeBucketPhoto}/>
          <BottomPanel
            count={this.props.photosGrid.length}
            photos={this.props.photosBucket}
            countries={this.props.countries}
            searchParams={searchParams}
            updateSearchParams={this.updateSearchParams}
            onRemovePhoto={this.removeBucketPhoto}
            onShowBucket={this.hideBucket}
          />
        </Grid>
      </div>
    );
  }
}

function getSearchParams(props) {
  var params = {
    page: props.page,
    startdate: props.startdate,
    country: props.country,
    like: props.like,
    tags: props.tags,
    direction: props.direction,
  }
  return params;
}

export default Photos;
