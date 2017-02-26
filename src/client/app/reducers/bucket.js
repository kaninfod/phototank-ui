import AppConstants from '../constants/constants';
import { List, Map, fromJS } from 'immutable';

var init = {
  selectedWidget: 'BUCKETGRID',
  data: {
    bucket: [],
    albums: [],
    photo: {
      comments: [],

    }
  },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_BUCKET_FULFILLED': {
      return state.setIn(['data'], (fromJS(action.payload)));
    }

    case 'SELECT_PHOTO_FULFILLED': {
      return state.setIn(['data', 'bucket'], (action.payload.bucket));
    }

    case 'ADD_BUCKET_TO_ALBUM': {
      return state;
    }

    case 'LOAD_ALBUMS_FULFILLED': {
      return state.setIn(['data', 'albums'], fromJS(action.payload.albums));
    }

    case 'SET_BUCKET_WIDGET': {
      return state.set('selectedWidget', action.payload.widget);
    }
  }
  return state;
}
