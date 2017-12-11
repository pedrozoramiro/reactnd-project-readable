import { createAction } from 'redux-actions';

export const STORE_ADD_POST = 'STORE_ADD_POST'
export const STORE_REMOVE_POST = 'STORE_REMOVE_POST'
export const STORE_UPDATE_POSTS = 'STORE_UPDATE_POSTS'
export const STORE_UPDATE_POST = 'STORE_UPDATE_POST'
export const STORE_PUSH_POST = 'STORE_PUSH_POST'

export const REQUEST_ALL_POST = 'REQUEST_ALL_POST'
export const REQUEST_ALL_POST_BY_CATEGORY = 'REQUEST_ALL_POST_BY_CATEGORY'
export const REQUEST_POST = 'REQUEST_POST'
export const REQUEST_SAVE_POST = 'REQUEST_SAVE_POST'
export const REQUEST_VOTESCORE_POST = 'REQUEST_VOTESCORE_POST'
export const REQUEST_REMOVE_POST = 'REQUEST_REMOVE_POST'
export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST'
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'


export const requestAllPosts = data => createAction(REQUEST_ALL_POST)(data);
export const requestAllPostsByCategory = data => createAction(REQUEST_ALL_POST_BY_CATEGORY)(data);
export const requestPost = data => createAction(REQUEST_POST)(data);
export const requestCreatePost = data => createAction(REQUEST_CREATE_POST)(data);
export const requestVoteScore = data => createAction(REQUEST_VOTESCORE_POST)(data);
export const requestRemovePost = data => createAction(REQUEST_REMOVE_POST)(data);
export const requestUpdatePost = data => createAction(REQUEST_UPDATE_POST)(data);

export const storeUpdatePost = function (postIndex) {
    return data => createAction(STORE_UPDATE_POST)({postIndex,post:data});
}

export const storeRemovePost = post => createAction(STORE_REMOVE_POST)({post});
export const storePushPost = post => createAction(STORE_PUSH_POST)({post});
export const storeUpdatePosts = data => createAction(STORE_UPDATE_POSTS)(data);
