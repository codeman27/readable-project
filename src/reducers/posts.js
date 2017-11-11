import {SET_POSTS_FULFILLED, SET_CATEGORY_POSTS_FULFILLED} from '../actions/actionTypes'
import {SET_POST_FULFILLED} from '../actions/actionTypes'

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
    default: return state
  }
}
