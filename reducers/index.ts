import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { routerReducer } from 'connected-next-router'
// import {
//   connectRouter,
//   RouterState,
//   LocationChangeAction,
// } from "connected-react-router";

import counter from "./user"

export type LocationState = {
  href: string;
  pathname: string;
  hash: string;
  search: string;
}

export type RouterAction = "POP" | "PUSH" | "REPLACE";

export type RouterState = {
  location: LocationState;
  action: RouterAction;
}

export interface State {
  router: RouterState;
  [propName: string]: any;
}


// export interface State {
//   router: Reducer<RouterState, LocationChangeAction>;
//   [propName: string]: any;
// }

export default () =>
  combineReducers({
    router: routerReducer,
    [counter.store]: counter.reducer,
  });

export function* rootSaga() {
  yield all([...counter.takes]);
}
