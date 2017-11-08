import { combineReducers } from 'redux'

import {
  CHANGE_HEADER,
  SET_CATEGORIES,
  SET_POSTS,
  SET_COMMENTS
} from '../actions'

const initialHeaderState = 'Readables!'

function header (state = initialHeaderState, action) {
  switch(action.type){
    case CHANGE_HEADER:
      const {header} = action
      return header
    default: return state
  }
}

function categories (state = [], action) {
  switch(action.type) {
    case SET_CATEGORIES:
      const {categories} = action
      return categories
    default: return state
  }
}

function posts (state = [], action){
  switch(action.type) {
    case SET_POSTS:
      const {posts} = action
      return posts
    default: return state
  }
}

function comments (state = [], action){
  switch(action.type) {
    case SET_COMMENTS:
      const {comments} = action
      return comments
    default: return state
  }
}

export default combineReducers({
  header,
  categories,
  posts,
  comments
})
