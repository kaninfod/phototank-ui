import stateTypes from '../constants/stateTypes';
import {
  catalogs,
  catalogsCreate,
  catalogsVerifyDropbox,
  catalogsUpdate,
  catalogsImport
 } from '../api/apiCatalogs';
import store from '../store';

export function getCatalogs() {
  return function (dispatch) {
    return catalogs()
    .then(response => {
      dispatch({ type: 'LOAD_CATALOGS_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function createCatalogs(payload) {
  return function (dispatch) {
    return catalogsCreate(payload)
    .then(response => {
      dispatch({ type: 'CREATE_CATALOG_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function updateCatalog(payload) {
  return function (dispatch) {
    return catalogsUpdate(payload)
    .then(response => {
      dispatch({ type: 'UPDATE_CATALOG_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function verifyDropboxCatalog(payload) {
  return function (dispatch) {
    return catalogsVerifyDropbox(payload)
    .then(response => {
      dispatch({ type: 'VERIFY_DROPBOX_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function importCatalog(payload) {
  return function (dispatch) {
    return catalogsImport(payload)
    .then(response => {
      dispatch({ type: 'IMPORT_CATALOG_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}
