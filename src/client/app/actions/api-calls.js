var headers = new Headers({
  'Authorization': sessionStorage.jwt
});

export function authValidateToken() {

  var url = 'api/authentication/validate';
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'VALIDATE_TOKEN', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'VALIDATE_TOKEN', payload: err });
      });
  };
}

export function authenticate(payload) {
  var url = '/api/authenticate';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function photos(url) {
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'FETCH_PHOTOS', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_PHOTOS', payload: err });
      });
  };
}

export function photo(photoId) {
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

export function photoDelete(photoId) {
  var url = '/api/photos/' + photoId + '.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'DELETE' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'DELETE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_PHOTO', payload: 'err' });
      });
  };
}

export function photoRotate(payload) {
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

export function photoAddComment(payload) {
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

export function photoLike(photoId) {
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

export function bucket() {
  var url = '/api/bucket/widget.json';
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

export function bucketToggle(photoId) {
  var url = '/api/bucket/'.concat(photoId, '/toggle');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'POST' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'SELECT_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'SELECT_PHOTO', payload: 'err' });
      });
  };
}

export function bucketRotate(degrees) {
  var url = '/api/bucket/rotate';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ degrees: degrees }),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketLike() {
  var url = '/api/bucket/like';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketAddToAlbum(albumId) {
  var url = '/api/bucket/add_to_album';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({album_id: albumId}),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketAddComment(comment) {
  var url = '/api/bucket/add_comment';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({comment: comment}),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function albums() {
  var url = '/api/albums.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_ALBUMS', payload: response.json() });
      })
      .catch((err) => {
        console.log('lakd');
        dispatch({ type: 'LOAD_ALBUMS', payload: err });
      });
  };
}

export function albumAddPhoto(payload) {
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
