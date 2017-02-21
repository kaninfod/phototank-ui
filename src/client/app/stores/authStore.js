var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppConstants = require('../constants/constants.js');

var CHANGE_EVENT = 'change';

var _state = {
  loggedIn: false
}

var AuthStore = assign({}, EventEmitter.prototype, {

  isLoggedIn: function() {
    return !!localStorage.authKey
  },

  getState: function() {
    return _state
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
    case AppConstants.LOGIN:
      login(payload.action.content)
      break;
    case AppConstants.LOGOUT:
      logout()
      break;
    default:

  }

});
var logout = function(payload) {
  _state.loggedIn = false
  _state.Authorization = null
  window.localStorage.removeItem('Authorization')
  AuthStore.emitChange()
}

var login = function(payload) {
  var url = "/api/authenticate"
  $.post(url, payload)
  .fail(function(data) {
    _state.loggedIn = false
  })
  .done(function(data) {
    console.log('setting from api');
    _state.Authorization = data.auth_token
    _state.loggedIn = true
    localStorage.authKey = data.auth_token

  })
  .always(function(data) {
    AuthStore.emitChange()
  })
}

module.exports = AuthStore;
