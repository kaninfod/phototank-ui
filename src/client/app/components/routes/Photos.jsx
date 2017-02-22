
import React from 'react';
import Grid from '../photogrid/grid.jsx'
import PhotoCard from '../card/photo'
import Bucket from '../card/bucket'



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
