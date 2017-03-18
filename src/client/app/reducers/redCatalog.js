import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  catalogs: [],
  albums: [],
  authUrl: null,
  catalog: { },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case stateTypes.LOAD_CATALOGS_FULFILLED: {
      state = state.set('catalogs', fromJS(action.payload.catalogs))
      .set('catalog', Map())
      .set('authUrl', null);
      return state;
    }

    case stateTypes.LOAD_ALBUMS_FULFILLED: {
      state = state.set('albums', fromJS(action.payload.albums));
      return state;
    }

    case stateTypes.CREATE_CATALOG_FULFILLED: {
      state = state.set('catalog', fromJS(action.payload.catalog));
      state = state.set('authUrl', fromJS(action.payload.auth_url));
      return state;
    }

    case stateTypes.UPDATE_CATALOG_FULFILLED: {
      var catalog = state.getIn(['catalog']);
      state = state.mergeDeep(fromJS(action.payload));
      return state;
    }

    case stateTypes.VERIFY_DROPBOX_FULFILLED: {
      var catalog = state.getIn(['catalog']);
      state = state.mergeDeep(fromJS(action.payload));
      return state;
    }

  }

  return state;
}
