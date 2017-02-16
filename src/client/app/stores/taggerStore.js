var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/constants.js');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _tagger = {
  suggestions: [],
  inputValue: '',
  tags: [],
  selectedSuggestion: null
}

var TaggerStore = assign({}, EventEmitter.prototype, {
  getTagger: function() {
    return _tagger
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(payload){
  if (TaggerStore.listenerCount(CHANGE_EVENT) == 0) {return null}
  switch (payload.source) {
    case AppConstants.SELECT_PHOTO:
      loadTags(payload.action.content)
      break;
    case AppConstants.ADD_TAG:
      addTag(payload.action.content)
      break;
    case AppConstants.REMOVE_TAG:
      removeTag(payload.action.content)
      break;
    case AppConstants.TAG_INPUT:
      tagInput(payload.action.content)
      break;
    case AppConstants.SELECT_SUGGESTION:
      selectSuggestion(payload.action.content)
      break;
    default:
  }

});


var loadTags = function(payload) {
  var url = "/api/photos/get_tag_list"
  $.getJSON(url, {photo_id: payload.photoId}, function(data) {
    _tagger.tags = data
    _tagger.photoId = payload.photoId
    TaggerStore.emitChange()
  })

}

var addTag = function(payload) {
  console.log("addYag");
  var url = "/api/photos/".concat(payload.photoId, "/addtag")
  $.getJSON(url, {name: payload.name},function(data) {
    console.log(data);
    _tagger.tags = data.tags
    _tagger.inputValue = ''
    TaggerStore.emitChange()
  })
}

var removeTag = function(payload) {
  var url = "/api/photos/".concat(payload.photoId, "/removetag")
  $.getJSON(url, {name: payload.name},function(data) {
    console.log(data);
    _tagger.tags = data.tags
    TaggerStore.emitChange()
  })
}

var tagInput = function(payload) {
  var url = "/api/photos/get_tag_list?term=".concat(payload.inputValue)
  $.getJSON(url,function(data) {
    _tagger.suggestions = data
    _tagger.inputValue = payload.inputValue
    TaggerStore.emitChange()
  })
}

var selectSuggestion = function(payload) {
  if (payload.selectedSuggestion) {
    _tagger.selectedSuggestion = payload.selectedSuggestion
    _tagger.inputValue = payload.selectedSuggestion.name
  } else {
    _tagger.selectedSuggestion = null
    _tagger.suggestions = []
  }
  TaggerStore.emitChange()
}

module.exports = TaggerStore;
