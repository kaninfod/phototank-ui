
import React from 'react';
import Grid from '../photogrid/grid.jsx'
import PhotoCard from '../photoCard/photoCard.jsx'
import Bucket from '../bucket/bucket.jsx'



export default class Photos extends React.Component {

  render() {
    return (
      <div>
        <Grid/>
        <PhotoCard/>
        <Bucket/>
      </div>
    )
  }
}
