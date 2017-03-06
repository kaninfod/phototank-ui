import AppConstants from '../constants/constants';
import { albumAddPhoto } from '../api/apiAlbums';
import { photo, photoRotate, photoAddComment, photoLike } from '../api/apiPhotos';

export function loadPhoto(photoId) {
  return photo(photoId);
}

export function setWidget(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  };
}

export function addToAlbum(payload) {
  albumAddPhoto(payload);
}

export function rotatePhoto(payload) {
  return photoRotate(payload);
}

export function addComment(payload) {
  return photoAddComment(payload);
}

export function likePhoto(photoId) {
  return photoLike(photoId);
}

export function deleteCardPhoto(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  };
}
