
import {put, takeEvery} from 'redux-saga/effects';
import postService from './postService'
import apiSaga from '../commons/saga/apiSaga'
import { 
  requestAllPosts,
  storeUpdatePosts,
  requestPost,
  requestSavePost,
  storeUpdatePost,
  requestVoteScore,
  requestAllPostsByCategory,
  requestRemovePost,
  REQUEST_VOTESCORE_POST,
  REQUEST_REMOVE_POST,
  REQUEST_SAVE_POST,
  REQUEST_POST,
  REQUEST_ALL_POST,
  REQUEST_ALL_POST_BY_CATEGORY,
  REQUEST_UPDATE_POST,
  REQUEST_CREATE_POST,
  storeRemovePost,
  storePushPost


} from './postAction';
import { REQUEST_ALL_CATEGORY } from './category/categoryActions';

function * getAllPosts(action) { 
   yield * apiSaga(postService.getAllPosts(),storeUpdatePosts,null);
}

function * getPost(action) {   
  const postId = action.payload;
  yield * apiSaga(postService.getPost(postId),storePushPost,null);
}

function * createPost(action) { 
  const {post} = action.payload;
  yield * apiSaga(postService.createPost(post),storePushPost,null);
}

function * updatePost(action) { 
  const {post} = action.payload;
  yield * apiSaga(postService.updatePost(post),storeUpdatePost(action.payload.postIndex),null);
}

function * updateVoteScorePost(action) { 
  const {voteScoreCmd,post,postIndex} = action.payload;
  yield * apiSaga(postService.updateVoteScore(post,voteScoreCmd),storeUpdatePost(postIndex),null);
}

function * getAllPostsByCategory(action) { 
  const {category} = action.payload;
  yield * apiSaga(postService.getAllPostsByCategory(category),storeUpdatePosts,null);
}

function * removePost(action) { 
  const {post} = action.payload;
  yield * apiSaga(postService.removePost(post),storeRemovePost,null);
}

export default function * postSaga() {
  yield takeEvery(REQUEST_VOTESCORE_POST, updateVoteScorePost);
  yield takeEvery(REQUEST_REMOVE_POST, removePost);
  yield takeEvery(REQUEST_CREATE_POST, createPost);
  yield takeEvery(REQUEST_UPDATE_POST, updatePost);
  yield takeEvery(REQUEST_POST, getPost);
  yield takeEvery(REQUEST_ALL_POST, getAllPosts);
  yield takeEvery(REQUEST_ALL_POST_BY_CATEGORY, getAllPostsByCategory);
}

