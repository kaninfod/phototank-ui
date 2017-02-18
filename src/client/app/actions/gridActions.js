import AppConstants from '../constants/constants'

var headers = new Headers({
  'Authorization': localStorage.Authorization
})



export function loadPhotos(url) {
  return function(dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({type: "FETCH_PHOTOS", payload: response.json()})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PHOTOS", payload: err})
      })
  }
}

export function clickPhoto(photoId) {
  return {
    type: 'CLICK_PHOTO',
    payload: {
      selectedPhoto: photoId
    }
  }
}

export function selectPhoto(photoId) {
  var url = '/api/bucket/'.concat(photoId, '/toggle')
  return function(dispatch) {
    var request = new Request(url, { headers: headers, method: 'POST' });
    fetch(request)
      .then((response) => {
        dispatch({type: "SELECT_PHOTO", payload: response.json()})
      })
      .catch((err) => {
        dispatch({type: "SELECT_PHOTO", payload: "err"})
      })
  }
}

export function deletePhoto(photoId) {
  var url = '/api/photos/' + photoId + '.json'
  return function(dispatch) {
    var request = new Request(url, { headers: headers, method: 'DELETE' });
    fetch(request)
      .then((response) => {
        dispatch({type: "DELETE_PHOTO", payload: response.json()})
      })
      .catch((err) => {
        dispatch({type: "DELETE_PHOTO", payload: "err"})
      })
  }
}
