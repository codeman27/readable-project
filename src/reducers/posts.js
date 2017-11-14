import {SET_POSTS_FULFILLED, SET_CATEGORY_POSTS_FULFILLED, SET_POST_FULFILLED, CLEAR_POST} from '../actions/actionTypes'

export function posts (state = [], action){
  switch(action.type) {
    case SET_POSTS_FULFILLED:
      return action.payload
    case SET_CATEGORY_POSTS_FULFILLED:
       return action.payload
    default: return state
  }
}

export function post (state = {}, action){
  switch(action.type) {
    case SET_POST_FULFILLED:
      return action.payload
    case CLEAR_POST:
      return action.payload
    default: return state
  }
}
