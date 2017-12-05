import { combineReducers } from 'redux'
import { posts } from '../post/postReducer';
import { categories } from '../post/category/categoryReducer';
import { commentReducer } from '../post/comment/commentReducer';

export default combineReducers({
  posts,
  categories,
  commentReducer
})