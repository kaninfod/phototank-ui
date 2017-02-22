import AppConstants from '../constants/constants';

var headers = new Headers({
  'Authorization': localStorage.authKey,
});

export function loadPhoto(photoId) {
  var url = '/api/photos/'.concat(photoId, '.json');
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LOAD_PHOTO', payload: err });
      });
  };
}

export function setWidget(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  };
}

export function addToAlbum(payload) {
  var url = '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId, '/add');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ADD_TO_ALBUM', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TO_ALBUM', payload: 'err' });
      });
  };
}

export function rotatePhoto(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotateAngle);
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ROTATE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ROTATE_PHOTO', payload: 'err' });
      });
  };
}

export function addComment(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/add_comment');
  return function (dispatch) {
    headers.append('Content-Type', 'application/json');
    var request = new Request(
      url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ comment: payload.comment }),
      });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ADD_COMMENT', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_COMMENT', payload: 'err' });
      });
  };

}

export function likePhoto(photoId) {
  var url = '/api/photos/'.concat(photoId, '/like');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LIKE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LIKE_PHOTO', payload: 'err' });
      });
  };
}

export function deleteCardPhoto(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  };
}
