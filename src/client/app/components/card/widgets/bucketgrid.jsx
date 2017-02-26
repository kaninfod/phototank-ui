import React, { PropTypes } from 'react';
import { Header } from './header.jsx';

const Bucketgrid = React.createClass({
  render() {
    var photos = this.props.data.bucket.map(entry => {
      return photo(entry);
    });

    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photos in Bucket"/>
        <div className="pt-widget content">
          <div className="pt-bucket-grid">
            { photos }
          </div>
        </div>
      </div>
    );
  },
});

const photo = (props) => {
  return (

      <img class="responsive-img" key={props.id} src={props.photo_url.concat('?token=', sessionStorage.jwt)}/>

  );
};

export default Bucketgrid;
