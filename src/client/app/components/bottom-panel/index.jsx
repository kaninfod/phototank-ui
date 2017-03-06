import React, { PropTypes } from 'react'
import '../../stylesheets/panel';
import Tab from './tab';
import Content from './content';
import Buttons from '../card/widgets/buttons';
import BucketThumb from '../card/widgets/bucket-thumb';
import { getButtons } from './bucket-button.props';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class BottomPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.toggleDirection = this.toggleDirection.bind(this);
    this.showBucketDialog = this.showBucketDialog.bind(this);
    // this.handleSearchParams = this.handleSearchParams.bind(this);
    this.state = {
      mainPanel: { open: false },
      searchParams: {
        nextPage:   props.searchParams.nextPage,
        startdate:  props.searchParams.startdate,
        country:    props.searchParams.country,
        direction:  props.searchParams.direction,
        like:       props.searchParams.like,
        tags:       props.searchParams.tags,
      },
      panels: [
        { id: 'Search', active: false },
        { id: 'Bucket', active: true },
        { id: 'Close', active: false },
      ],
    };
  }

  handleClick(e) {
    var contentName = e.target.dataset.panelid;
    var newState = {};

    newState = {
      mainPanel: {
        open: true,
      },
      panels: [],
    };

    newState.panels = this.state.panels.map(p => {
            if (p.id == contentName) {
              p.active = true;
            } else {
              p.active = false;
            }

            return p;
          });
    this.setState(newState);
  }

  closePanel() {
    this.setState({ mainPanel: { open: false } });
  }

  showBucketDialog(e) {
    console.log(e);
  }

  toggleDirection(e) {
    this.props.updateSearchParams('direction', e.target.checked);
  }

  render () {
    const searchPanel = this.state.panels[0];
    const bucketPanel = this.state.panels[1];
    const closePanel = this.state.panels[2];
    const mainPanel   = this.state.mainPanel;
    var photos = this.props.photos.map(bucketPhoto => {
      return BucketThumb({ bucketPhoto: bucketPhoto, onRemovePhoto: this.props.onRemovePhoto });
    });

    return (
    <div id="pt-panel" class={'pt-panel ' + (mainPanel.open ? 'open' : '')}>
      <div class="pt-panel-tabs">
        <Tab data={searchPanel} clickHandler={this.handleClick}/>
        <Tab data={bucketPanel} clickHandler={this.handleClick}/>
        <Tab data={closePanel} clickHandler={this.closePanel}/>
      </div>

      <div class="pt-panel-contents">
        <Content data={searchPanel}>
          <div class="pt-bucket-tools row">
            <div class="col l4">
              <DatePicker hintText="Start date" />
              <div class="switch">
                <label>
                  Backwards
                  <input id="direction" type="checkbox"
                    checked={this.props.searchParams.direction}
                    onChange={this.toggleDirection}/>
                  <span class="lever"></span>
                  Forwards
                </label>
              </div>
              <Toggle label="Search forward"/>
              <Toggle label="Liked"/>
              <Toggle label="Liked"/>
            </div>
            <div class="col l4">
              <SelectField
                floatingLabelText="Frequency"
                value={this.state.value}
                onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Never" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
                <MenuItem value={5} primaryText="Weekly" />
              </SelectField>
              <div class="input-field col s12">
                <select>
                  <option value=""  defaultValue>Choose your option</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
                <label>Materialize Select</label>
              </div>
            </div>
          </div>
        </Content>
        <Content data={bucketPanel}>
          <div class="pt-bucket-tools">
            <a className={ 'btn-floating waves-effect waves-light pt-button' }
              onClick={this.props.onShowBucket}>
              <i className="material-icons">
                info
              </i>
            </a>
            <div class="pt-button" onClick={this.props.onShowBucket}/>
          </div>

          <div class="pt-bucket-photos" >
            <div class="pt-bucket-photos-container" >
              {photos}
            </div>
          </div>

        </Content>
      </div>
    </div>);
  }
}

export default BottomPanel;
