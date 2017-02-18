import { combineReducers } from "redux"

import grid from "./gridReducer"
import photoCard from "./photoCardReducer"


export default combineReducers({
  grid,
  photoCard
})
