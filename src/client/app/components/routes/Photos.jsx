
import React from 'react';
import Grid from '../photogrid/grid.jsx'
import PhotoCard from '../photoCard/photoCard.jsx'
import Bucket from '../bucket/bucket.jsx'



export default class Photos extends React.Component {

  render() {
    return (
      <div>
        <Grid selectedPhoto="642"/>
        <PhotoCard photoId="565"/>
        <Bucket/>
      </div>
    )
  }
}
