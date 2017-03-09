import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  catalogs: [],
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case stateTypes.LOAD_CATALOGS_FULFILLED: {
      console.log(action.payload);
      state = state.set('catalogs', fromJS(action.payload.catalogs));
      return state
    }

  }
  return state;
}
