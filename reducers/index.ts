import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { routerReducer } from 'connected-next-router'
import counter, { Counter } from "./user"

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

export type State = Readonly<{
  router: RouterState;
  counter: Counter
}>;

export default () =>
  combineReducers<State>({
    router: routerReducer,
    counter: counter.reducer,
  });

export function* rootSaga() {
  yield all([...counter.takes]);
}
