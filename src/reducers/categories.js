import {SET_CATEGORIES_FULFILLED} from '../actions/actionTypes'

export function categories (state = [], action) {
  switch(action.type) {
    case SET_CATEGORIES_FULFILLED:
      return action.payload
    default: return state
  }
}
