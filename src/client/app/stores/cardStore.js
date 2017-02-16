var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/constants.js');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _card = {
  widget: 'INFO',
  data: {},
  hidden: false

}

var CardStore = assign({}, EventEmitter.prototype, {

  getCard: function() {
    return _card
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }

});

AppDispatcher.register(function(payload){

  switch (payload.source) {
    case AppConstants.SELECT_PHOTO:
      loadPhoto(payload.action.content.photoId)
      break;
    case AppConstants.LOAD_PHOTO:
      loadPhoto(payload.action.content.photoId)
      break;
    case AppConstants.SET_WIDGET:
      _card.widget = payload.action.content.widget
      CardStore.emitChange()
      break;
    case AppConstants.LIKE_PHOTO:
      likePhoto(payload.action.content)
      break;
    case AppConstants.DELETE_CARD_PHOTO:
      CardStore.emitChange()
      break;
    case AppConstants.ROTATE_PHOTO:
      rotatePhoto(payload.action.content)
      break;
    case AppConstants.ADD_TO_ALBUM:
      addToAlbum(payload.action.content)
      break;
    case AppConstants.ADD_COMMENT:
      addComment(payload.action.content)
      break;

    default:
  }

});

var headers = new Headers({
  'Authorization': localStorage.Authorization
})

var loadPhoto = function(photoId) {
  var url = "/api/photos/".concat(photoId, ".json")
  var request = new Request(url, { headers: headers });

  fetch(request)
  .then(function(response) {return response.json()})
  .then(function(json){
    console.log(json);
    _card.data = json
    _card.hidden = false
    CardStore.emitChange()
  })
}

var likePhoto = function(payload) {
  var url = '/api/photos/'.concat(payload.photoId,'/like')
  var request = new Request(url, { headers: headers });

  fetch(request)
  .then(function(response) {return response.json()})
  .then(function(json){
    console.log(json);
    _card.data.photo.like = json.liked_by_current_user
    CardStore.emitChange()
  })
}

var addToAlbum = function(payload) {
  var url = "/api/albums/".concat(payload.albumId, "/photo/", payload.photoId, "/add")
  var request = new Request(url, { headers: headers });

  fetch(request)
  .then(function(response) {return response.json()})
  .then(function(json){
    console.log(json);
    CardStore.emitChange()
  })
  .catch(function(error) {
    console.log('Request failed', error);
  })

}

var rotatePhoto = function(payload) {
  var url = "/api/photos/".concat(payload.photoId, "/rotate/", payload.rotateAngle)
  var request = new Request(url, { headers: headers });

  fetch(request)
  .then(function(response) {return response.json()})
  .then(function(json){
    console.log(json);
    CardStore.emitChange()
  })

}

var addComment = function(payload) {
  headers.append("Content-Type", "application/json")
  var url = '/api/photos/'.concat(payload.photoId, '/add_comment')
  var request = new Request(
    url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({comment: payload.comment})
    });

  fetch(request)
  .then(function(response) {
    console.log(response);
    return response.json()
  })
  .then(function(json){
    console.log(json);
    _card.data.photo.comments = json.comments
    CardStore.emitChange()
  })
}



module.exports = CardStore;
