var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppConstants = require('../constants/constants.js');

var CHANGE_EVENT = 'change';
var collection = []
var _grid = {
  photos:[],
  selectedPhoto: null
}

var GridStore = assign({}, EventEmitter.prototype, {
  getGrid: function() {
    return _grid
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

});

AppDispatcher.register(function(payload){

  switch (payload.source) {
    case AppConstants.SELECT_PHOTO:
      _grid.selectedPhoto = payload.action.content.photoId
      GridStore.emitChange()
      break;
    case AppConstants.DELETE_PHOTO:
      deletePhoto(payload.action.content.photoId)
      break;

    case AppConstants.BUCKET_PHOTO:
      bucketPhoto(payload.action.content.photoId)
      break;

    case AppConstants.LOAD_PHOTOS:
      getPhotos(payload.action.content.url)
      break;

    default:

  }

});

var getPhotos = function(url) {

  $.ajax({
      url: url,
      headers: {Authorization: localStorage.Authorization}
  })
  .done(function(data) {
    var _photos = _grid.photos.concat(data.photos)
    data.photos = _photos
    _grid = data
    GridStore.emitChange()
  }.bind(this))
}


//
//   $.getJSON(url, function(data) {
//     var _photos = _grid.photos.concat(data.photos)
//     data.photos = _photos
//     _grid = data
//     GridStore.emitChange()
//   }.bind(this))
// }

var deletePhoto = function(photoId) {
  $.ajax({
    method: 'DELETE',
    url: '/api/photos/' + photoId + '.json'
  })
    .done(function() {
      var objIndex = _grid.photos.findIndex(obj => obj.id == photoId)
      _grid.photos.splice(objIndex, 1)
      GridStore.emitChange()
    }.bind(this));
}

var bucketPhoto = function(photoId) {
  var url = `/api/bucket/${photoId}/toggle`
  $.post(url, function(data) {
      console.log(data);
      var objIndex = _grid.photos.findIndex(obj => obj.id == photoId)
      _grid.photos[objIndex].bucket = !_grid.photos[objIndex].bucket
      GridStore.emitChange()
    }.bind(this))
}

module.exports = GridStore;
