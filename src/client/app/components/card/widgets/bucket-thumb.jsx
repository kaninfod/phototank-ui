import React, { PropTypes } from 'react';

const bucketThumb = (props) => {
  return (
    <img
      onClick={props.onRemovePhoto}
      class="responsive-img"
      key={props.bucketPhoto.id}
      data-photoid={props.bucketPhoto.id}
      src={props.bucketPhoto.photo_url.concat('?token=', sessionStorage.jwt)}/>
  );
};

export default bucketThumb;
