import { combineReducers } from 'redux'
import { posts } from '../post/postReducer';
import { categories } from '../post/category/categoryReducer';

export default combineReducers({
  posts,
  categories
})