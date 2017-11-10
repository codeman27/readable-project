import {SET_COMMENTS} from '../actions/actionTypes'


export function comments (state = [], action){
  switch(action.type) {
    case SET_COMMENTS:
      const {comments} = action
      return comments
    default: return state
  }
}
