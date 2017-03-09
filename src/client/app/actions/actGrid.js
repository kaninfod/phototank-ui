import stateTypes from '../constants/stateTypes';
import { photos, photoDelete } from '../api/apiPhotos';
import { bucketToggle } from '../api/apiBucket';
import { locationCountries } from '../api/apiLocations';
import store from '../store';

export function getNextPage(params) {
  return function (dispatch) {
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

export function getPhotos(payload) {
  var photosArray = [];
  return function (dispatch) {
    if (payload.hasOwnProperty('change')) {
      dispatch({
          type: 'UPDATE_SEARCH_PARAMS',
          payload: payload.change,
        }
      );
    }

    if (payload.hasOwnProperty('context')) {
      if (payload.context == 'catalog') {
        return null;
      } else if (payload.context == 'album') {
        return null;
      } else if (payload.context == 'location') {
        return null;
      } else if (payload.context == 'search') {
        var searchParams = store.getState().grid.get('searchParams').toJS();
        photosArray = photos(searchParams);
      }
    }
    photosArray.then(response => {
      dispatch({ type: 'SET_HEADER', payload: response.pagination });
      dispatch({ type: 'LOAD_PHOTOS', payload: response.json });
    });
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

export function getCountries() {
  return function (dispatch) {
    return locationCountries()
    .then(response => {
      dispatch({ type: stateTypes.LOAD_COUNTRIES_FULFILLED, payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}
