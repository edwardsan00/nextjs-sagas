import { createStore, applyMiddleware, compose } from "redux";
import { createRouterMiddleware } from "connected-next-router";
import createSagaMiddleware from "redux-saga";

import createRootReducer, { rootSaga } from "reducers";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, createRouterMiddleware()];

const finalCreateStore = compose(applyMiddleware(...middleware));

const store = createStore(
  createRootReducer(),
  initialState,
  finalCreateStore
);

sagaMiddleware.run(rootSaga);

export default store;
