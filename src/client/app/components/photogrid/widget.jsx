import React from 'react';
import '../../stylesheets/grid.css';

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.state = {
    };
  }

  handleHover(e) {
    var overlayButton = $(this.refs.widget).find(".overlay-button:not(.overlay-processing)");
    if (e.type == 'mouseenter')
      overlayButton.addClass('overlay-show');
    else
      overlayButton.removeClass('overlay-show');
  }

  handleSelect(e) {
    this.props.handleSelect(this.props.photo.id);
  }

  handleZoom(e) {
    console.log(this.refs);
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.photo.id);
  }

  handleClick(e) {
    this.props.handleClick(this.props.photo.id);
  }

  render() {
    return (

        <div
          id={this.props.photo.id} className=" hoverable photo-widget z-depth-1" ref="widget"
          onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
          <div className="photo-widget-content"></div>
            <div className="photo-widget-header">

              <img
                className="lazy" id={this.props.photo.id} onClick={this.handleClick}
                data-original={this.props.photo.url.concat('?token=', localStorage.authKey)}/>

              <div className={'overlay-button overlay-select ' +
                (this.props.photo.bucket ? 'selected' : '')}
                onClick={this.handleSelect} ref="select" >
                    <i className="material-icons">check</i>
              </div>

              <div className="overlay-button overlay-zoom selected"
                onClick={this.handleZoom} ref="zoom" >
                    <i className="material-icons">zoom_out_map</i>
              </div>

              <div className="overlay-button overlay-delete selected"
                onClick={this.handleDelete} ref="delete" >
                    <i className="material-icons">delete_forever</i>
              </div>

            </div>
            <div className="photo-widget-date">{this.props.photo.date_taken}</div>
        </div>

      );
  }
}

Widget.defaultProps = {

};
