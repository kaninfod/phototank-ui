import AppConstants from '../constants/constants';
import { bucket, bucketToggle, albums } from './api-calls';

export function loadBucket() {
  return bucket();
}

export function selectPhoto(photoId) {
  return bucketToggle(photoId);
}

export function loadAlbums() {
  return albums();
}

export function setWidget(widget) {
  return {
    type: 'SET_WIDGET',
    payload: { widget: widget },
  };
}
