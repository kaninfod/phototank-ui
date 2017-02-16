var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppConstants = require('../constants/constants.js');

var CHANGE_EVENT = 'change';
var collection = []
var _bucket = {
  photos:[]
}

var BucketStore = assign({}, EventEmitter.prototype, {
  getBucket: function() {
    return _bucket
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

});

AppDispatcher.register(function(payload){

  switch (payload.source) {
    case AppConstants.SELECT_PHOTO:
      break;
    default:

  }

});

var bucketPhoto = function(photoId) {
  var url = `/api/bucket/${photoId}/toggle`
  $.post(url, function(data) {
      var objIndex = _grid.photos.findIndex(obj => obj.id == photoId)
      _grid.photos[objIndex].bucket = !_grid.photos[objIndex].bucket
      GridStore.emitChange()
    }.bind(this))
}



module.exports = BucketStore;
