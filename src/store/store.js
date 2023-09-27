//root reducer

import { applyMiddleware, compose, legacy_createStore } from 'redux';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedEnhancers
);
