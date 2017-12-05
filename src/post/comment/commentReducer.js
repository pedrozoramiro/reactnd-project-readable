import {
  REFRESH_COMMENTS
} from './commentAction'

const initialState = {
  comments:[],
}

export function commentReducer(state = initialState, action) {
 
  switch (action.type) {
    
    case REFRESH_COMMENTS:{
      debugger;
      const {comments} = action;
      return {...state, comments}
    }

    default:
      return state;
  }
      
}
