import {getData,postData,deleteData,putData} from '../../commons/api'
import UUIDV1 from 'uuid/v1'
import { debug } from 'util';

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function loadComments(data) {
  const comments = Array.isArray(data) ? data: [data];
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

function updateComment(commentIndex) {
  return function (comment) {
    return {
      type: UPDATE_COMMENT,
      commentIndex,
      comment
    }
  }
}

function removeComment(commentIndex,commentId) {
  return function () {
    return {
      type: REMOVE_COMMENT,
      commentIndex
    }
  }
}

function addComment(comment) {
   return {
      type: ADD_COMMENT,
      comment
  }
}

export function getAllComments(postId){
  return getData(`/posts/${postId}/comments`,loadComments);
}

export function deleteComment(commentIndex,commentId){
  return deleteData(`/comments/${commentId}`,removeComment(commentIndex));
}



export function saveComment(body,parentId){
  const comment = {
    id: UUIDV1(),
    body,
    timestamp : Date.now(),
    author : "USER LOGGED NAME",
    parentId
  };
  return postData(`/comments`,comment,addComment);
}


export function updateBodyComment(body,commentId,commentIndex){
  
  const commentUpdate = {
    timestamp:Date.now(),
    body
  };
  return putData(`/comments/${commentId}`,commentUpdate,updateComment(commentIndex));
}
export function updateVoteScore(comments,commentIndex,voteScoreCmd){  
  return postData(`/comments/${comments.id}`,{option:voteScoreCmd}, updateComment(commentIndex));
}
