import { createAction } from 'redux-actions';
import {getData,postData,deleteData,putData} from '../../commons/api'
import UUIDV1 from 'uuid/v1'

export const STORE_ADD_COMMENTS = 'STORE_ADD_COMMENTS'
export const STORE_ADD_COMMENT = 'STORE_ADD_COMMENT'
export const STORE_UPDATE_COMMENT = 'STORE_UPDATE_COMMENT'
export const STORE_REMOVE_COMMENT = 'STORE_REMOVE_COMMENT'
export const REQUEST_CREATE_COMMENT = 'REQUEST_CREATE_COMMENT'
export const REQUEST_REMOVE_COMMENT = 'REQUEST_REMOVE_COMMENT'
export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT'
export const REQUEST_VOTESCORE_COMMENT = 'REQUEST_VOTESCORE_COMMENT'
export const REQUEST_ALL_COMMENTS = 'REQUEST_ALL_COMMENTS'


export const storeAddComment =(data) => createAction(STORE_ADD_COMMENT)(data);
export const storeRemoveComment = data => createAction(STORE_REMOVE_COMMENT)({comment:data});
export const storeUpdateComment = data => createAction(STORE_UPDATE_COMMENT)({comment:data});
export const storeAddComments =(data) => createAction(STORE_ADD_COMMENTS )(data);

export const requestCreateComment = data => createAction(REQUEST_CREATE_COMMENT)(data);
export const requestRemoveComment = data => createAction(REQUEST_REMOVE_COMMENT)(data);
export const requestUpdateComment = data => createAction(REQUEST_UPDATE_COMMENT)(data);
export const requestVoteScoreComment = data => createAction(REQUEST_VOTESCORE_COMMENT)(data);
export const requestAllComments = data => createAction(REQUEST_ALL_COMMENTS)(data);