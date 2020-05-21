import { combineReducers } from 'redux';
import playersReducer from './playersReducer';
import { reducer as formReducer } from 'redux-form';
import draftPreferencesReducer from './draftPreferencesReducer';
import counterReducer from './counterReducer';
import rostersReducer from './rostersReducer';
import analysisReducer from './analysisReducer';
import renderReducer from './renderReducer';
import playerProfileReducer from './playerProfileReducer';

const rootReducer = combineReducers({
  playersReducer,
  playerProfileReducer,
  counterReducer,
  renderReducer,
  rostersReducer,
  analysisReducer,
  form: formReducer,
  draftPreferencesReducer
});

export default rootReducer
