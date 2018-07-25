import { combineReducers } from 'redux';
import playersReducer from './playersReducer';
import { reducer as formReducer } from 'redux-form';
import draftPreferencesReducer from './draftPreferencesReducer';
import favoritesReducer from './favoritesReducer';
import counterReducer from './counterReducer';
import rostersReducer from './rostersReducer';

const rootReducer = combineReducers({
  playersReducer,
  favoritesReducer,
  counterReducer,
  rostersReducer,
  form: formReducer,
  draftPreferencesReducer
});

export default rootReducer
