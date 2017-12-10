import {
  STORE_ADD_POST,
  STORE_REMOVE_POST,
  STORE_UPDATE_POST,
  STORE_UPDATE_POSTS,
  STORE_SORT_POST
} from './postAction'

const initialState = {
  posts: [],
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
      const  {post}  = action.payload;
      const { posts } = state;
      return { ...state, posts: posts.filter(p => p.id !== post.id) }
    }

    case STORE_UPDATE_POSTS: {
      const  posts  = action.payload;
      return { ...state, posts }
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

    default:
      return state;
  }

}
