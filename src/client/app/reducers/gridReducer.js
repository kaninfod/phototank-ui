import AppConstants from '../constants/constants';
import { List, Map, fromJS } from 'immutable';

var init = {
  photos: [],
  selectedPhoto: null,
  nextPage: '/api/photos.json?page=1',
  loading: true,
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CLICK_PHOTO': {
      return state.set('selectedPhoto', action.payload.selectedPhoto);
    }

    case 'DELETE_PHOTO_FULFILLED': {
      var photos = state.get('photos').filter(obj => {
        return obj.get('id') != action.payload.photo_id;
      });
      return state.set('photos', photos);
    }

    case 'SELECT_PHOTO_FULFILLED': {
      var photos = state.get('photos').map(photo => {
        if (photo.get('id') == action.payload.photo_id) {
          return (photo.update('bucket', flag => !photo.get('bucket')));
        } else {
          return photo;
        }
      });

      return state.set('photos', photos);
    }

    case 'SELECT_PHOTO_REJECTED': {
      return state.set('error', fromJS(action.payload));
    }

    case 'FETCH_PHOTOS_PENDING': {
      return state.set('loading', false);
    }

    case 'FETCH_PHOTOS_FULFILLED': {
      var url = $('<div/>').html(action.payload.pagi).find('.next_page').attr('href');
      var nextPage = '/api'.concat(url);
      var newState = state
        .set('nextPage', nextPage)
        .set('loading', true)
        .set('photos', state.get('photos').concat(fromJS(action.payload.photos)));
      return newState;
    }
  }
  return state;
}
