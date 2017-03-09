import stateTypes from '../constants/stateTypes';
import { catalogs } from '../api/apiCatalogs';
import store from '../store';

export function getCatalogs() {
  return function (dispatch) {
    dispatch({ type: 'LOAD_CATALOGS_PENDING', payload: {} });
    return catalogs()
    .then(response => {
      dispatch({ type: 'LOAD_CATALOGS_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}
