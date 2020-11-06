import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./authReducer";
import profileReducer from "./profileReducer"
import watchListReducer from './watchlistReducer';
import trailerReducer from "./trailerReducer";

const rootReducer = combineReducers({
    authentication: authReducer,
    profiles: profileReducer,
    watchList: watchListReducer,
    trailer: trailerReducer
});

let storeEnhancer;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk);
}


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancer
  )
}
