import React, { PropTypes } from 'react';
import Photos from './photos';

const CatalogPhotos = (props) => {
  return (
    <Photos context="catalog" contextId={props.match.params.id}/>
    );
};

export default CatalogPhotos;
