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

export function updateSearchParams(payload) {
  return function (dispatch) {
    if (!!payload.change.length) {
      dispatch({
          type: 'UPDATE_SEARCH_PARAMS',
          payload: payload.change,
        }
      );
    }

    var searchParams = store.getState().grid.get('searchParams').toJS();
    return photos(searchParams)
    .then(response => {
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
