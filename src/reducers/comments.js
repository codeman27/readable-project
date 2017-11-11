import {SET_COMMENTS_FULFILLED, SET_COMMENT_FULFILLED} from '../actions/actionTypes'


export function comments (state = [], action){
  switch(action.type) {
    case SET_COMMENTS_FULFILLED:
      return action.payload
    default: return state
  }
}

export function comment (state = {}, action){
  switch(action.type){
    case SET_COMMENT_FULFILLED:
      return action.payload
    default: return state
  }
}
