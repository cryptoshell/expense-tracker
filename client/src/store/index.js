import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

// Defaults to localStorage for web
import storage from 'redux-persist/lib/storage';

import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

// Define config with web local storage
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

// Clean out persisted state on app enter
persistor.purge();

export {
  store,
  persistor,
};
