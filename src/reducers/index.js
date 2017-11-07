import { combineReducers } from 'redux'

import {
  CHANGE_HEADER,
  GET_CATEGORIES
} from '../actions'

const initialHeaderState = {
  header: 'Readables!'
}

function header (state = initialHeaderState, action) {
  const header = action.header
  switch(action.type){
    case CHANGE_HEADER:
      return {...state, header}
    default: return state
  }
}

function categories (state = [], action) {
  const {categories} = action
  switch(action.type) {
    case GET_CATEGORIES:
      return {...state, categories}
    default: return state
  }
}

export default combineReducers({
  header,
  categories
})
