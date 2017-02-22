import { combineReducers } from "redux";
import grid from './gridReducer';
import photoCard from './photoCardReducer';
import tagger from './taggerReducer';
import auth from './authReducer';
import bucket from './bucket';

export default combineReducers({
  grid,
  photoCard,
  tagger,
  auth,
  bucket,
})
