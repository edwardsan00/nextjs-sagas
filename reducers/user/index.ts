import produce from "immer";
import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import base, { DuckInitialState, DuckTypes } from "reducers/base";
import { takeEvery } from 'redux-saga/effects'
import { addCountFromServer } from "./saga"
import { HYDRATE } from 'next-redux-wrapper'
import { State } from "reducers"

interface User {
  id: number,
  name: string
}

export type Counter = DuckInitialState & {
  count: number;
  users: Array<User>
};

interface Other {
  counter: Counter
}

export type CounterAction = {
  payload: Other;
  type: string;
};

export default base({
  namespace: "crassa",
  store: "counter",
  initialState: {
    count: 1,
    users: [],
  },
}).extend({
  types: ["ADD_COUNT", "REMOVE_COUNT"],
  reducer: (state: Counter, action: CounterAction, { types }: DuckTypes) =>
    produce<Counter>(state, (draft) => {
      switch (action.type) {
        case HYDRATE:
          if(action.payload.counter) { 
            draft.users = action.payload.counter.users
            draft.count = action.payload.counter.count
            draft.status = action.payload.counter.status
          }

        return;

        case types.ADD_COUNT:
          draft.count++;

          return;
        case types.REMOVE_COUNT:
          draft.count--;

          return;
        default:
          return;
      }
    }),
  selectors: ({ store }: DuckTypes) => ({
    getCount: (state: State): number => state[store].count,
    getStatus: (state: State): string => state[store].status,
  }),
  creators: ({ types }: DuckTypes) => ({
    addCount: () => ({ type: types.ADD_COUNT }),
    removeCount: () => ({ type: types.REMOVE_COUNT }),
    addCountFromServer: () => ({ type: types.FETCH, [ WAIT_FOR_ACTION ]: types.FETCH_FULFILLED }),
  }),
  sagas: (duck: DuckTypes) => ({
    addCountFromServer: addCountFromServer(duck),
  }),
  takes: ({ types, sagas }: DuckTypes) => ([
    takeEvery(types.FETCH, sagas.addCountFromServer),
  ])
});
