import AppConstants from '../constants/constants';
import { List, Map, fromJS } from 'immutable';

var init = {
  selectedWidget: 'BUCKETGRID',
  data: {
    bucket: [],
    albums: [],
  },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_BUCKET_FULFILLED': {
      return state.setIn(['data', 'bucket'], action.payload.buckets);
    }

    case 'LOAD_ALBUMS_FULFILLED': {
      return state.setIn(['data', 'albums'], action.payload.albums);
    }

    case 'SET_WIDGET': {
      return state.set('selectedWidget', action.payload.widget);
    }
  }
  return state;
}