import { combineReducers } from 'redux';
import playersReducer from './playersReducer';
import teamReducer from './teamReducer';
import { reducer as formReducer } from 'redux-form';
import draftPreferencesReducer from './draftPreferencesReducer';
import favoritesReducer from './favoritesReducer'

const rootReducer = combineReducers({
  playersReducer,
  teamReducer,
  favoritesReducer
});

export default rootReducer
