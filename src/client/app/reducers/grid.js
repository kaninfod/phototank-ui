import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  photos: [],
  selectedPhoto: null,
  loading: true,
  searchParams: {
    nextPage: 1,
    startdate: '10-03-2015',
    country: 'All',
    direction: true,
    like: false,
    tags: [],
  },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case stateTypes.UPDATE_SEARCH_PARAMS: {
      return state.setIn(['searchParams', action.payload.key], action.payload.value);
    }

    case stateTypes.CLICK_PHOTO: {
      return state.set('selectedPhoto', action.payload.selectedPhoto);
    }

    case stateTypes.DELETE_PHOTO_FULFILLED: {
      var photos = state.get('photos').filter(obj => {
        return obj.get('id') != action.payload.photo_id;
      });
      return state.set('photos', photos);
    }

    case stateTypes.SELECT_PHOTO_FULFILLED: {
      var photos = state.get('photos').map(photo => {
        if (photo.get('id') == action.payload.photo_id) {
          return (photo.update('bucket', flag => !photo.get('bucket')));
        } else {
          return photo;
        }
      });
      return state.set('photos', photos);
    }

    // case stateTypes.SELECT_PHOTO_REJECTED: {
    //   return state.set('error', fromJS(action.payload));
    // }

    case stateTypes.LOAD_PHOTOS_PENDING: {
      return state.set('loading', false);
    }

    case stateTypes.LOAD_PHOTOS_FULFILLED: {
      var newState = Map();
      if (action.payload.pagi === null) {
        newState = state
          .set('photos', state.get('photos').concat(fromJS(action.payload.photos)));
      } else {
        var params = extractSearchParams(action.payload.pagi);
        newState = state
          .setIn(['searchParams', 'nextPage'], params.get('page'))
          .setIn(['searchParams', 'startdate'], params.get('startdate'))
          .setIn(['searchParams', 'country'], params.get('country'))
          .setIn(['searchParams', 'direction'], params.get('direction'))
          .setIn(['searchParams', 'like'], params.get('like'))
          .setIn(['searchParams', 'tags'], params.get('tags'))
          .set('loading', true)
          .set('photos', state.get('photos').concat(fromJS(action.payload.photos)));
      }

      return newState;
    }

  }
  return state;
}

function extractSearchParams(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  var urlString = div.getElementsByClassName('next_page')[0].getAttribute('href');
  var url = new URL('http:/'.concat(urlString));
  var searchParams = new URLSearchParams(url.search);
  return searchParams;
}
