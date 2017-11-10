import { combineReducers } from 'redux'
import { header } from './header'
import { categories } from './categories'
import { posts } from './posts'
import { comments } from './comments'

export default combineReducers({
  header,
  categories,
  posts,
  comments
})
