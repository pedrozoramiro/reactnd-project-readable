import {
  STORE_ADD_COMMENTS,
  STORE_UPDATE_COMMENT,
  STORE_ADD_COMMENT,
  STORE_REMOVE_COMMENT
} from './commentAction'

const initialState = {
  comments:[],
}

export function commentReducer(state = initialState, action) {
 
  switch (action.type) {
    
    case STORE_ADD_COMMENTS:{
      const comments = action.payload;
      return {...state, comments}
    }

    case STORE_ADD_COMMENT:{
      const comment = action.payload;
      return {...state, comments:state.comments.concat([comment])}
    }
    
    case STORE_UPDATE_COMMENT:{
      const {comments} = state;
      const {comment} = action.payload;
      const newComments = comments.map((oldComment)=> comment.id == oldComment.id ? comment:oldComment);
      return {...state, comments :newComments }
    }
    
    case STORE_REMOVE_COMMENT:{
      const {comments} = state;
      const {comment} = action.payload;
      return {...state, comments:comments.filter((c) => c.id !== comment.id)}
    }
    
    default:
      return state;
  }
      
}


