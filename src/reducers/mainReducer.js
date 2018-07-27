import { combineReducers } from 'redux';
import playersReducer from './playersReducer';
import { reducer as formReducer } from 'redux-form';
import draftPreferencesReducer from './draftPreferencesReducer';
import favoritesReducer from './favoritesReducer';
import counterReducer from './counterReducer';
import rostersReducer from './rostersReducer';
import analysisReducer from './analysisReducer';
import renderReducer from './renderReducer'

const rootReducer = combineReducers({
  playersReducer,
  favoritesReducer,
  counterReducer,
  renderReducer,
  rostersReducer,
  analysisReducer,
  form: formReducer,
  draftPreferencesReducer
});

export default rootReducer
