import React, { PropTypes } from 'react'
import Photos from './photos'

const SearchPhotos = (props) => {
  return (
    <Photos context="search" contextId={false}/>
  )
}

export default SearchPhotos
