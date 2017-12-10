import UUIDV1 from 'uuid/v1'

import { getData, postData, deleteData, putData } from '../commons/api'

export default {
  updateVoteScore: (post,data) => function () {
    
    return postData(`/posts/${post.id}`, { option: data })
  },
  updatePost: (post) => function () {
    
    return putData(`/posts/${post.id}`, post);
  },
  createPost: (post) => function () {
    post.id = UUIDV1();
    post.timestamp = Date.now();
    return postData(`/posts`, post);
  },
  getPost: postId => function () {
    return getData(`/posts/${postId}`);
  },
  getAllPosts: () => function () {
    return getData("/posts");
  },
  getAllPostsByCategory: (category) => function () {
    return getData(`/${category}/posts`);
  },
  removePost: (post) => function () {
    return deleteData(`/posts/${post.id}`);
  }
};
