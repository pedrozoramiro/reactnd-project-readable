import {getData,postData} from '../../commons/api'

export const REFRESH_COMMENTS = 'REFRESH_COMMENTS'
export const REFRESH_COMMENT = 'REFRESH_COMMENT'

export function refreshComments(data) {
  const comments = Array.isArray(data) ? data: [data];
  return {
    type: REFRESH_COMMENTS,
    comments
  }
}

function refreshComment(commentIndex) {
  return function (comment) {
    return {
      type: REFRESH_COMMENT,
      commentIndex,
      comment
    }
  }
}

export function getAllComments(postId){
  return getData(`/posts/${postId}/comments`,refreshComments);
}

export function updateVoteScore(comments,commentIndex,voteScoreCmd){  
  return postData(`/comments/${comments.id}`,{option:voteScoreCmd}, refreshComment(commentIndex));
}
