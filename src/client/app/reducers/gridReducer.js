import AppConstants from '../constants/constants'

export default function reducer(state={
    photos:[],
    selectedPhoto: null,
    nextPage: "/api/photos.json?page=1",
    bucket:[],
    loading: true


  }, action) {
    switch (action.type) {
      case 'CLICK_PHOTO': {
        return {
          ...state,
          selectedPhoto: action.payload.selectedPhoto
        }
      }
      case "DELETE_PHOTO_PENDING": {
        return {
          ...state,
          delete: 'Pending'
        }
      }
      case "DELETE_PHOTO_FULFILLED": {
        var objIndex = state.photos.findIndex(obj => obj.id == action.payload.photo_id)
        state.photos.splice(objIndex, 1)
        return {
          ...state,
          photos: state.photos,
          delete: action.payload.photo_id
        }
      }

      case "DELETE_PHOTO_REJECTED": {
        console.log('err');
        return {
          ...state,
          delete: action.payload
        }
      }


      case "SELECT_PHOTO_PENDING": {
        return {
          ...state,
          select: 'Pending'
        }
      }
      case "SELECT_PHOTO_FULFILLED": {
        var objIndex = state.photos.findIndex(obj => obj.id == action.payload.photo_id)
        state.photos[objIndex].bucket = !state.photos[objIndex].bucket
        return {
          ...state,
          photos: state.photos,
          bucket: action.payload.bucket,
          selected: action.payload.photo_id
        }
      }

      case "SELECT_PHOTO_REJECTED": {
        return {
          ...state,
          select: action.payload
        }
      }

      case "FETCH_PHOTOS_PENDING": {
        return {
          ...state,
          loading: false
        }
      }
      case "FETCH_PHOTOS_FULFILLED": {
        var url = $('<div/>').html(action.payload.pagi).find(".next_page").attr('href')
        var nextPage = '/api'.concat(url)
        return {
          ...state,
          photos: state.photos.concat(action.payload.photos),
          nextPage: nextPage,
          bucket: action.payload.bucket,
          loading: true
        }
      }

      case AppConstants.FETCH_PHOTOS_REJECTED: {
        return {
          ...state,
          photos: 'action.payload.photos'

        }
      }
      case AppConstants.LOAD_PHOTOS: {
        return {
          ...state,
          photos: action.payload.photos
        }
      }
    }
    return state
}
