
import {put, takeEvery} from 'redux-saga/effects';
import categoryService from './categoryService'
import apiSaga from '../../commons/saga/apiSaga'
import { storeAddCategories, requestAllCategories, REQUEST_ALL_CATEGORY } from './categoryActions';

function * getAllCategories(action) { 
  
  yield * apiSaga(categoryService.getAllCategories(),storeAddCategories,null);
}


export default function * categorySaga() {
  yield takeEvery(REQUEST_ALL_CATEGORY, getAllCategories);
  
}

