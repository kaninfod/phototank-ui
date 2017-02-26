import React, { PropTypes } from 'react'
import { connect } from "react-redux";
import '../../stylesheets/panel';

import Tab from './tab';
import Content from './content';

import Buttons from '../card/widgets/buttons'
import { getButtons } from './bucket-button.props';

const components = {
  BUCKETGRID:   'Bucketgrid',
  ROTATE:   'Rotate',
  ALBUMS:   'Albums',
  COMMENTS: 'Comments',
  TAG:      'Tag',
  DELETE:   'Delete',
  LIKE:     'Like'
};



@connect((store) => {
  console.log(store);
  return {

  };
})
class BottomPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.showBucketDialog = this.showBucketDialog.bind(this);
    this.state = {
      mainPanel: {open: true},
      panels: [
        {id: 'search', active: false},
        {id: 'bucket', active: true},
        {id: 'close', active: false},
      ]
    };
  }

  handleClick(e) {
    var contentName = e.target.dataset.panelid
    var newState = {}

    newState = {
      mainPanel: {
        open: true,
      },
      panels: []
    }

    newState.panels = this.state.panels.map( p=> {
            if (p.id == contentName) {
              p.active = true
            } else {
              p.active = false
            }
            return p
          })
    this.setState(newState)
  }

  closePanel() {
      this.setState({ mainPanel: {open: false}})
  }

  showBucketDialog(e) {
    console.log(e);
  }

  render () {
    const searchPanel = this.state.panels[0]
    const bucketPanel = this.state.panels[1]
    const closePanel = this.state.panels[2]
    const mainPanel   = this.state.mainPanel
    // const buttons = getButtons();
    // const widgetHandlers = {
    //   ROTATE:   this.rotatePhotos,
    //   ALBUMS:   this.addToAlbum,
    //   COMMENTS: this.addComment,
    //   HIDE:     this.hide,
    // };



    return (
    <div id="pt-panel" class={'pt-panel ' + (mainPanel.open ? 'open' : '')}>
      <div class="pt-panel-tabs">
        <Tab data={searchPanel} clickHandler={this.handleClick}/>
        <Tab data={bucketPanel} clickHandler={this.handleClick}/>
        <Tab data={closePanel} clickHandler={this.closePanel}/>
      </div>

      <div class="pt-panel-contents">
        <Content data={searchPanel}>
            search
        </Content>
        <Content data={bucketPanel}>

          <div class="pt-bucket-tools">
            <div class="pt-button" onClick={this.props.onShowBucket}/>
          </div>

          <div class="pt-bucket-photos" >

          </div>

        </Content>
      </div>
    </div>)
  }
}






export default BottomPanel;
