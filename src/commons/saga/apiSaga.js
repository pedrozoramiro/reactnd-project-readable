import { put, takeEvery } from 'redux-saga/effects'

export default function* fetchData (fn, sucess,error) {
  try {
        
    const data = yield fn();
    if(data.error){
      yield put(error(data.error));
      return;    
    }
    yield put(sucess(data));
  } catch (e) {
    
    yield put(error(e))
  }
}