import React from 'react';
import Grid from '../components/photogrid/grid';
import PhotoCard from '../components/card/photo';
import Bucket from '../components/card/bucket';
import BottomPanel from '../components/bottom-panel';



class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.hideBucket = this.hideBucket.bind(this);
    this.state = {
      hidden: this.props.hidden,
    };
  };


  hideBucket() {
    console.log(this.state.hidden);

    this.setState({ hidden: !this.state.hidden });
  }

  render () {
    return (
      <div>
        <Grid>
          <PhotoCard/>
          <Bucket hidden={this.state.hidden}/>
          <BottomPanel onShowBucket={this.hideBucket}/>
        </Grid>
      </div>
    )
  }
}

export default Photos;
