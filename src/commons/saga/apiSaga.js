import { put, takeEvery } from 'redux-saga/effects'

export default function* fetchData (fn, sucess,error) {
  try {
    const data = yield fn();
    yield put(sucess(data));
  } catch (e) {
    yield put(error())
  }
}