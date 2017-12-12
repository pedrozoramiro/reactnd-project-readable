import { createAction } from 'redux-actions';

export const REQUEST_ALL_CATEGORY = 'REQUEST_ALL_CATEGORY'
export const STORE_ADD_CATEGORIES = 'STORE_ADD_CATEGORIES'

export const requestAllCategories = createAction(REQUEST_ALL_CATEGORY);
export const storeAddCategories = data => createAction(STORE_ADD_CATEGORIES)(data);
