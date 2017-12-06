import {
  LOAD_COMMENTS,
  UPDATE_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './commentAction'

const initialState = {
  comments:[],
}

export function commentReducer(state = initialState, action) {
 
  switch (action.type) {
    
    case LOAD_COMMENTS:{
      const {comments} = action;
      return {...state, comments}
    }

    case ADD_COMMENT:{
      const {comment} = action;
      return {...state, comments:state.comments.concat([comment])}
    }
    
    case UPDATE_COMMENT:{
      const {comments} = state;
      const {commentIndex,comment} = action;
      const newComments = comments.map((oldComment, index)=> commentIndex == index ? comment:oldComment);
      return {...state, comments :newComments }
    }
    
    case REMOVE_COMMENT:{
      const {comments} = state;
      const {commentIndex} = action;
      return {...state, comments:comments.filter((comment,index) => index !== commentIndex)}
    }
    
    default:
      return state;
  }
      
}


