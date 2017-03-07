import { combineReducers } from "redux";
import grid from './grid';
import photoCard from './photoCard';
import tagger from './tagger';
import auth from './auth';
import bucket from './bucket';

export default combineReducers({
  grid,
  photoCard,
  tagger,
  auth,
  bucket,
})
