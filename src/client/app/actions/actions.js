var AppDispatcher = require('../dispatcher/dispatcher.js');
var AppConstants = require('../constants/constants.js');

var AppActions = {
  //PhotoGrid Actions
  selectPhoto: function(item){
    AppDispatcher.handleSelectPhoto({
      type:AppConstants.SELECT_PHOTO,
      content: item
    })
  },

  deletePhoto: function(item){
    AppDispatcher.handleDeletePhoto({
      type:AppConstants.DELETE_PHOTO,
      content: item
    })
  },

  bucketPhoto: function(item){
    AppDispatcher.handleBucketPhoto({
      type:AppConstants.BUCKET_PHOTO,
      content: item
    })
  },

  loadPhotos: function(item){
    AppDispatcher.handleLoadPhotos({
      type:AppConstants.LOAD_PHOTOS,
      content: item
    })
  },


  loadPhoto: function(item){
    AppDispatcher.handleLoadPhoto({
      type:AppConstants.LOAD_PHOTO,
      content: item
    })
  },

  setCardWidget: function(item){
    AppDispatcher.handleCardWidget({
      type:AppConstants.SET_WIDGET,
      content: item
    })
  },

  likePhoto: function(item){
    AppDispatcher.handleLikePhoto({
      type:AppConstants.LIKE_PHOTO,
      content: item
    })
  },

  deleteCardPhoto: function(item){
    AppDispatcher.handleDeleteCardPhoto({
      type:AppConstants.DELETE_CARD_PHOTO,
      content: item
    })
  },

  rotatePhoto: function(item){
    AppDispatcher.handleRotatePhoto({
      type:AppConstants.ROTATE_PHOTO,
      content: item
    })
  },

  addToAlbum: function(item){
    AppDispatcher.handleAddToAlbum({
      type:AppConstants.ADD_TO_ALBUM,
      content: item
    })
  },

  addComment: function(item){
    AppDispatcher.handleAddComment({
      type:AppConstants.ADD_COMMENT,
      content: item
    })
  },

//Actions for PhotoTagger
addTag: function(item){
  AppDispatcher.handleAddTag({
    type:AppConstants.ADD_TAG,
    content: item
  })
},

removeTag: function(item){
  AppDispatcher.handleRemoveTag({
    type:AppConstants.REMOVE_TAG,
    content: item
  })
},

tagInput: function(item){
  AppDispatcher.handleTagInput({
    type:AppConstants.TAG_INPUT,
    content: item
  })
},

selectSuggestion: function(item){
  AppDispatcher.handleSelectSuggestion({
    type:AppConstants.SELECT_SUGGESTION,
    content: item
  })
},

login: function(item){
  AppDispatcher.handleLogin({
    type:AppConstants.LOGIN,
    content: item
  })
},

logout: function(item){
  AppDispatcher.handleLogout({
    type:AppConstants.LOGOUT,
    content: item
  })
},

}

module.exports = AppActions
