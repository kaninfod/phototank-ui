import React from 'react';
import { connect } from "react-redux";
import Grid from '../components/photogrid/grid';
import PhotoCard from '../components/card/photo';
import Bucket from '../components/card/bucket';
import BottomPanel from '../components/bottom-panel';
import { selectPhoto } from '../actions/bucket';
import { getNextPage, updateSearchParams } from '../actions/gridActions'

@connect((store) => {
  return {
    photos: store.bucket.getIn(['data', 'bucket']).toJS(),
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

  hideBucket() {
    this.setState({ hidden: !this.state.hidden });
  }

  removeBucketPhoto(e) {
      this.props.dispatch(selectPhoto(e.target.dataset.photoid))
  }

  handleInfiniteScroll() {
    this.props.dispatch(getNextPage(getSearchParams(this.props.searchParams)));
  }

  updateSearchParams(key, value) {
    // var searchParams = getSearchParams(this.props.searchParams);
    // searchParams[key] = value;
    this.props.dispatch(updateSearchParams({key: key, value: value,}));
    // console.log('inbetween', this.props.searchParams.direction);
    // this.props.dispatch(getNextPage(getSearchParams(this.props.searchParams)));
  }

  render () {
    var searchParams = getSearchParams(this.props.searchParams)
    console.log(this.props.searchParams.direction);
    return (
      <div>
        <Grid
          searchParams={searchParams}
          onNextPage={this.handleInfiniteScroll}>
          <PhotoCard/>
          <Bucket
            hidden={this.state.hidden}
            onHideBucket={this.hideBucket}
            onRemovePhoto={this.removeBucketPhoto}/>
          <BottomPanel
            onShowBucket={this.hideBucket}
            photos={this.props.photos}
            onRemovePhoto={this.removeBucketPhoto}
            searchParams={searchParams}
            updateSearchParams={this.updateSearchParams}
          />
        </Grid>
      </div>
    );
  }
}

function getSearchParams(props) {
  var params = {
    page: props.nextPage,
    startdate: props.startdate,
    country: props.country,
    like: props.like,
    tags: props.tags,
    direction: props.direction,
  }
  return params;
}

export default Photos;
