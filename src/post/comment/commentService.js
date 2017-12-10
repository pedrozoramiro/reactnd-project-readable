import UUIDV1 from 'uuid/v1'

import { getData, postData, deleteData, putData } from '../../commons/api'

export default {
  getAllComments: (post) => function () {
    
    return getData(`/posts/${post.id}/comments`);
  },
  deleteComment: (comment) => function () {
    return  deleteData(`/comments/${comment.id}`);
  },
  createComment: (comment) => function () {
    comment.id= UUIDV1();
    comment.timestamp = Date.now();
    comment.author = "USER LOGGED NAME"
    return  postData(`/comments`,comment);
  },
  updateComment: (comment) => function () {
    comment.timestamp = Date.now();
    return  putData(`/comments/${comment.id}`,comment);
  },
  updateVoteScore: (comments,voteScoreCmd) => function () {
    return  postData(`/comments/${comments.id}`,{option:voteScoreCmd});
  },
};
