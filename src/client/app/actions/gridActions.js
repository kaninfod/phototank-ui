import AppConstants from '../constants/constants'
import { photos, bucketToggle, photoDelete } from './api-calls';

export function loadPhotos(url) {
  return photos(url);
}

export function clickPhoto(photoId) {
  return {
    type: 'CLICK_PHOTO',
    payload: {
      selectedPhoto: photoId,
    },
  };
}

export function selectPhoto(photoId) {
  return bucketToggle(photoId);
}

export function deletePhoto(photoId) {
  return photoDelete(photoId);
}
