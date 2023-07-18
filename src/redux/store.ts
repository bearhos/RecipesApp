import {persistedRootReducer} from '@redux/reducers';
import rootSaga from '@redux/rootSaga';
import {
  MiddlewareArray,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { asyncDispatchMiddleware, asyncFunctionMiddleware } from './middleware/asyncMiddleware';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = new MiddlewareArray().concat(
  sagaMiddleware,
  asyncDispatchMiddleware,
  asyncFunctionMiddleware,
);

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middleware.push(logger);
}

// Create Store
const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Start rootSaga
sagaMiddleware.run(rootSaga);

// Setup Store persistence
const persistor = persistStore(store, null);

export {store, persistor};
