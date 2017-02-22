import AppConstants from '../constants/constants';

var headers = new Headers({
  'Authorization': localStorage.authKey
});

export function loadData() {
  loadBucket();
  loadAlbums();
}

export function loadBucket() {
  var url = '/api/bucket.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_BUCKET', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LOAD_BUCKET', payload: err });
      });
  };
}

export function loadAlbums() {
  var url = '/api/albums.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_ALBUMS', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LOAD_ALBUMS', payload: err });
      });
  };
}


export function setWidget(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  }
}
