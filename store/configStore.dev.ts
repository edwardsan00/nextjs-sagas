import { AppContext } from "next/app"
import Router from "next/router"
import { format } from "url"
import { createStore, applyMiddleware, compose, Store } from "redux"
import { createLogger } from "redux-logger"
import {  createRouterMiddleware, initialRouterState } from "connected-next-router";
import createSagaMiddleware from "redux-saga"
import { MakeStore, createWrapper } from "next-redux-wrapper";
import createRootReducer, { rootSaga, State } from "reducers"


const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware,
  createRouterMiddleware(),
  createLogger(),
];

const finalCreateStore = compose(
  applyMiddleware(...middleware),
);


export const initStore: MakeStore<State> = (context): Store<State>  => {
  const { asPath, pathname, query } = (context as AppContext).ctx || Router.router || {};
  let initialState
  if (asPath) {
    const url = format({ pathname, query })
    initialState = {
      router: initialRouterState(url, asPath)
    }
  }
  const store = createStore(createRootReducer(), initialState, finalCreateStore);
  sagaMiddleware.run(rootSaga)

  return store

}
export const wrapper = createWrapper<State>(initStore, { debug: true })
