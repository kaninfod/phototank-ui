import AppConstants from '../constants/constants'
import { List, Map, fromJS } from 'immutable';

var init = {
  tags: [],
  selectedSuggestion: null,
  inputValue: '',
  suggestions: [],
}

const initialState = Map(fromJS(init))

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_TAGS_FULFILLED': {
        return state.set('tags', action.payload)
      }
      case 'TAG_INPUT_FULFILLED': {
        var newState = state
          .set('suggestions', action.payload.suggestions)
          .set('inputValue', action.payload.tagInput)
        return newState
      }
      case 'SELECT_SUGGESTION_SET': {
        newState = state
          .set('selectedSuggestion', action.payload.selectedSuggestion)
          .set('inputValue', action.payload.selectedSuggestion.name)
        return newState
      }
      case 'SELECT_SUGGESTION_UNSET': {
        newState = state
          .set('selectedSuggestion', null)
          .set('suggestions', [])
        return newState
      }
      case 'ADD_TAG_FULFILLED': {
        newState = state
          .set('tags', action.payload.tags)
          .set('inputValue', '')
        return newState
      }
      case 'REMOVE_TAG_FULFILLED': {
        newState = state
          .set('tags', action.payload.tags)
        return newState
      }
    }
    return state
  }
