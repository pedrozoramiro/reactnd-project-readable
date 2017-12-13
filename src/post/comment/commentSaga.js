
import { put, takeEvery } from 'redux-saga/effects';
import commentService from './commentService'
import apiSaga from '../../commons/saga/apiSaga'
import {
  REQUEST_ALL_COMMENTS,
  storeAddComments,
  REQUEST_CREATE_COMMENT,
  storeRemoveComment,
  REQUEST_UPDATE_COMMENT,
  storeUpdateComment,
  storeAddComment,
  REQUEST_REMOVE_COMMENT,
  REQUEST_VOTESCORE_COMMENT
} from './commentAction';
import { storeIncrementCountCommentPost } from '../postAction';

function* getAllComments(action) {
  const { post } = action.payload;
  yield* apiSaga(commentService.getAllComments(post), storeAddComments, null);
}

function* createComment(action) {
  const  comment  = action.payload;
  yield* apiSaga(commentService.createComment(comment), storeAddComment, null);
  yield put(storeIncrementCountCommentPost({postId:comment.parentId, value: 1}));  
}

function* removeComment(action) {
  const { comment } = action.payload;
  yield* apiSaga(commentService.deleteComment(comment), storeRemoveComment, null);
  yield put(storeIncrementCountCommentPost({postId:comment.parentId, value: -1}));  
}

function* updateComment(action) {
  const { comment } = action.payload;
  yield* apiSaga(commentService.updateComment(comment), storeUpdateComment, null);
}

function* updateVoteScoreComment(action) {
  const { comment,voteScoreCmd } = action.payload;
  yield* apiSaga(commentService.updateVoteScore(comment,voteScoreCmd), storeUpdateComment, null);
}

export default function* commentSaga() {
  yield takeEvery(REQUEST_ALL_COMMENTS, getAllComments);
  yield takeEvery(REQUEST_CREATE_COMMENT, createComment);
  yield takeEvery(REQUEST_REMOVE_COMMENT, removeComment);
  yield takeEvery(REQUEST_UPDATE_COMMENT, updateComment);
  yield takeEvery(REQUEST_VOTESCORE_COMMENT, updateVoteScoreComment);
}
