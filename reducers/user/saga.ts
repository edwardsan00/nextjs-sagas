import { call, put, take, fork } from "redux-saga/effects";
import { DuckTypes } from "../base";

import { Get } from "utils/request"

export const addCountFromServer = ({ types }: DuckTypes) =>
  function* () {
    try {
        yield put({ type: types.FETCH_PENDING });
        const payload = yield call(Get, "users");
        yield put({
          type: types.FETCH_FULFILLED,
          payload: {
            users: payload
          }
        });
    } catch (e) {
      const {
        type,
        message,
        response: { data: { message: messageResponse } = { message: "" } } = {},
      } = e;
      switch (type) {
        case "cancel":
          yield put({ type: types.FETCH_CANCEL });
          break;
        default:
          yield put({
            type: types.FETCH_FAILURE,
            error: messageResponse || message,
          });
          break;
      }
    }
  };

export const watchCountServer = ({ types, sagas }: DuckTypes) =>
  fork(function* () {
    while (true) {
      const { addMore } = yield take(types.FETCH);
      yield fork(sagas.addCountFromServer, addMore);
    }
  });
