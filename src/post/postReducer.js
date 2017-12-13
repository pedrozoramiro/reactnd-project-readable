import {
  STORE_ADD_POST,
  STORE_REMOVE_POST,
  STORE_UPDATE_POST,
  STORE_UPDATE_POSTS,
  STORE_SORT_POST,
  STORE_PUSH_POST,
  REQUEST_FAILED_POST,
  STORE_INCREMENT_COUNT_COMMENT_POST
} from './postAction'

const initialState = {
  posts: [],
  error:null,
  postDetailId: ''
}

export function posts(state = initialState, action) {

  switch (action.type) {
    case STORE_ADD_POST: {
      const post = action.payload;
      const { posts } = state;
      return { ...state, posts: posts.concat([post]) }
    }

    case STORE_REMOVE_POST: {
      const { post } = action.payload;
      const { posts } = state;
      return { ...state, posts: posts.filter(p => p.id !== post.id) }
    }

    case STORE_UPDATE_POSTS: {
      const posts = action.payload;
      return { ...state, posts }
    }
    case STORE_PUSH_POST: {
      const { posts } = state;
      const { post } = action.payload;
      return {
        ...state,
        posts: [
          ...posts.slice(0, 0),
          post,
          ...posts.slice(0)
        ]
      }
    }
    case STORE_UPDATE_POST: {
      const { posts } = state;
      const { postIndex, post } = action.payload;
      return {
        ...state,
        posts: [...posts.slice(0, postIndex),
          post,
        ...posts.slice(postIndex + 1)
        ]
      }
    }

    case STORE_INCREMENT_COUNT_COMMENT_POST: {
      const { posts } = state;
      const { value, postId } = action.payload;
      var newPosts = posts.map(post =>(post.id === postId) ? 
                                      Object.assign({}, post, {commentCount:post.commentCount+=value}):
                                      post
                                    );
      return {
        ...state,
        posts:newPosts
      }
    }

    case REQUEST_FAILED_POST: {
      const { posts } = state;
      const { error } = action.payload;
      
      return {...state,error}
    }

    default:
      return state;
  }

}