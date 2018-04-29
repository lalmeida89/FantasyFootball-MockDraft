import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import playersReducer from './playersReducer'

export default combineReducers({
  routing: routerReducer,
  playersReducer
})
