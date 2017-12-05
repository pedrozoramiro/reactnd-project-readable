import {getData} from '../../commons/api'

export const REFRESH_COMMENTS = 'REFRESH_COMMENTS'

export function refreshComments(data) {
  const comments = Array.isArray(data) ? data: [data];
  return {
    type: REFRESH_COMMENTS,
    comments
  }
}

export function getAllComments(postId){
  return getData(`/posts/${postId}/comments`,refreshComments);
}
