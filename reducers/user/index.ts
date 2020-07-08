import produce from "immer";

import base, { DuckInitialState, DuckTypes } from "reducers/base";
import { addCountFromServer, watchCountServer } from "./saga"

import { State } from "reducers";

export type Counter = DuckInitialState & {
  count: number;
};

export type CounterAction = {
  payload: Counter;
  type: string;
};

export default base({
  namespace: "crassa",
  store: "counter",
  initialState: {
    count: 0,
  },
}).extend({
  types: ["ADD_COUNT", "REMOVE_COUNT"],
  reducer: (state: Counter, action: CounterAction, { types }: DuckTypes) =>
    produce<Counter>(state, (draft) => {
      switch (action.type) {
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
    addCountFromServer: () => ({ type: types.FETCH }),
  }),
  sagas: (duck: DuckTypes) => ({
    addCountFromServer: addCountFromServer(duck),
  }),
  takes: (duck: DuckTypes) => [watchCountServer(duck)],
});
