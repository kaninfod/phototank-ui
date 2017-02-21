import React from 'react';
import {Header} from './header.jsx'
import PhotoTagger from '../tagger/photoTagger.jsx'

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log('photoId: ', this.props.cardData.photo.id);
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add tag to photo"/>
        <div className="pt-widget content">
          <div className="pt-tags">
            <PhotoTagger photoId={this.props.cardData.photo.id} tags={this.props.cardData.photo.tags}/>
          </div>
        </div>
      </div>
    )
  }
}
