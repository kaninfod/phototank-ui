var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var AppConstants = require('../constants/constants.js');


var AppDispatcher = assign(new Dispatcher(), {
  //Dispatchers for PhotoGrid
  handleSelectPhoto: function(action) {
    this.dispatch({
      source: AppConstants.SELECT_PHOTO,
      action: action
    });
  },

  handleDeletePhoto: function(action) {
    this.dispatch({
      source: AppConstants.DELETE_PHOTO,
      action: action
    });
  },
  handleBucketPhoto: function(action) {
    this.dispatch({
      source: AppConstants.BUCKET_PHOTO,
      action: action
    });
  },

  handleLoadPhotos: function(action) {
    this.dispatch({
      source: AppConstants.LOAD_PHOTOS,
      action: action
    });
  },
  //Dispatchers for PhotoCard
  handleLoadPhoto: function(action) {
    this.dispatch({
      source: AppConstants.LOAD_PHOTO,
      action: action
    });
  },

  handleCardWidget: function(action) {
    this.dispatch({
      source: AppConstants.SET_WIDGET,
      action: action
    });
  },

  handleDeleteCardPhoto: function(action) {
    this.dispatch({
      source: AppConstants.DELETE_CARD_PHOTO,
      action: action
    });
  },

  handleLikePhoto: function(action) {
    this.dispatch({
      source: AppConstants.LIKE_PHOTO,
      action: action
    });
  },

  handleAddToAlbum: function(action) {
    this.dispatch({
      source: AppConstants.ADD_TO_ALBUM,
      action: action
    });
  },

  handleRotatePhoto: function(action) {
    this.dispatch({
      source: AppConstants.ROTATE_PHOTO,
      action: action
    });
  },

  handleAddComment: function(action) {
    this.dispatch({
      source: AppConstants.ADD_COMMENT,
      action: action
    });
  },
//Dispatcher actions for Tagger
handleAddTag: function(action) {
  this.dispatch({
    source: AppConstants.ADD_TAG,
    action: action
  });
},

handleRemoveTag: function(action) {
  this.dispatch({
    source: AppConstants.REMOVE_TAG,
    action: action
  });
},

handleTagInput: function(action) {
  this.dispatch({
    source: AppConstants.TAG_INPUT,
    action: action
  });
},

handleSelectSuggestion: function(action) {
  this.dispatch({
    source: AppConstants.SELECT_SUGGESTION,
    action: action
  });
},

handleLogin: function(action) {
  this.dispatch({
    source: AppConstants.LOGIN,
    action: action
  });
},

handleLogout: function(action) {
  this.dispatch({
    source: AppConstants.LOGOUT,
    action: action
  });
},

});



module.exports = AppDispatcher;
