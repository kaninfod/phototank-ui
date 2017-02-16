import React from 'react';
import {Header} from './header.jsx'

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    const mapurl = this.props.photocard.photo.location.map_url.concat('?token=', localStorage.Authorization)
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photo location information"/>
        <div className="pt-widget content">
          <img src={mapurl}></img>
        </div>
      </div>
    )
  }
}