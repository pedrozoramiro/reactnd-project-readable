import { combineReducers } from 'redux'
import { posts } from '../post/postReducer';
import { categories } from '../post/category/categoryReducer';
import { commentReducer } from '../post/comment/commentReducer';

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  posts,
  categories,
  commentReducer,
  formReducer
})