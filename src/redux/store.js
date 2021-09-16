import storage from '@react-native-community/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};
const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  predicate: (getState, action) => action && action.type !== 'SET_LINES',
});
const persistedReducers = persistReducer(persistConfig, RootReducer);

const composeEnhancers =
  (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk, logger));

export default function createAppStore() {
  const store = createStore(persistedReducers, {}, enhancer);
  const persistor = persistStore(store, null, () => {});
  return {store, persistor};
}
