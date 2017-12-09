import UUIDV1 from 'uuid/v1'

import {getData,postData,deleteData,putData} from '../commons/api'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const REFRESH_POSTS = 'REFRESH_POSTS'
export const SORT_POST = 'SORT_POST'
export const REFRESH_POST = 'REFRESH_POST'


export function sortPosts(sortProperty){
  return {
    type: SORT_POST,
    sortProperty
  }
}

export function addPost ( post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost(post) {
  return {
    type: REMOVE_POST,
    post
  }
}

export function refreshPosts(data) {
  const posts = Array.isArray(data) ? data: [data];
  return {
    type: REFRESH_POSTS,
    posts
  }
}

function refreshPostUpdate(postIndex) {
  
  return function (post) {
    
    return {
      type: REFRESH_POST,
      postIndex,
      post
    }
  }
}

export function updateVoteScore(post,postIndex,voteScoreCmd){  
  return postData(`/posts/${post.id}`,{option:voteScoreCmd}, refreshPostUpdate(postIndex));
}

export function savePost(post,postIndex){ 
  if(post.id){
    return putData(`/posts/${post.id}`,post, refreshPostUpdate(postIndex));
  }  
  post.id = UUIDV1();
  post.timestamp = Date.now();
  return postData(`/posts`,post, addPost);
}

export function getPost(postId){
  return getData(`/posts/${postId}`,refreshPosts);
}

export function fetchAllPosts (){
  return getData("/posts",refreshPosts);
}

export function fetchAllByCategory (category){
  return getData(`/${category}/posts`,refreshPosts);
}

export function removePost (post){
  return deleteData(`/posts/${post.id}`,deletePost);
}
