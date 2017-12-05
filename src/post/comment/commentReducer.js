import {
  REFRESH_COMMENTS,
  REFRESH_COMMENT
} from './commentAction'

const initialState = {
  comments:[],
}

export function commentReducer(state = initialState, action) {
 
  switch (action.type) {
    
    case REFRESH_COMMENTS:{
      const {comments} = action;
      return {...state, comments}
    }

    case REFRESH_COMMENT:{
      const {comments} = state;
      const {commentIndex,comment} = action;
      return {...state,
                comments :[...comments.slice(0, commentIndex),
                comment,
                      ...comments.slice(commentIndex + 1)
                     ]
             }
    }
    default:
      return state;
  }
      
}
