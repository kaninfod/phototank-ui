import AppConstants from '../constants/constants';
import { photos, photoDelete } from '../api/apiPhotos';
import { bucketToggle } from '../api/apiBucket';

export function getNextPage(params) {
  return function(dispatch) {
    dispatch({ type: 'LOAD_PHOTOS_PENDING', payload: {} });
    return photos(params)
    .then(response => {
      dispatch({ type: 'LOAD_PHOTOS_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function updateSearchParams(payload) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_SEARCH_PARAMS',
      payload: {
        key: payload.key,
        value: payload.value,
      },
    })
  };
}

export function clickPhoto(photoId) {
  return {
    type: 'CLICK_PHOTO',
    payload: {
      selectedPhoto: photoId,
    },
  };
}

export function selectPhoto(photoId) {
  return bucketToggle(photoId);
}

export function deletePhoto(photoId) {
  return photoDelete(photoId);
}
