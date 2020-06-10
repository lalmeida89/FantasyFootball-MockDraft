import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/mainReducer';


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

//Setup Initial State or preloaded https://redux.js.org/docs/recipes/reducers/InitializingState.html
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
