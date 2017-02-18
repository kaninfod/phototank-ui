import AppConstants from '../constants/constants'


export default function reducer(state={
    widget: 'COMMENTS',
    hidden: false,
  }, action) {
    switch (action.type) {
      case 'LOAD_PHOTO_PENDING': {
        return {
          ...state,
        }
      }
      case 'LOAD_PHOTO_FULFILLED': {
        return {
          ...state,
          photoId: action.payload.photo.id,
          photo: action.payload.photo,
          currentUser: action.payload.current_user,
          albums: action.payload.albums,
          hidden: false,
          cardData: action.payload
        }
      }
      case 'CLICK_PHOTO': {
        return {
          ...state,
          photoId: action.payload.selectedPhoto
        }
      }
      case 'SET_WIDGET': {
        return {
          ...state,
          widget: action.payload.widget
        }
      }

      case 'ADD_COMMENT_FULFILLED': {
        state.cardData.photo.comments = action.payload.comments
        return {
          ...state,
          cardData: state.cardData,
          comments: action.payload.comments
        }
      }

      case 'LIKE_PHOTO_FULFILLED': {

        state.cardData.photo.like = action.payload.liked_by_current_user
        return {
          ...state,
          cardData: state.cardData,
          like: action.payload.liked_by_current_user
        }
      }


    }
    return state
  }
