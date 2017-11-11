import { combineReducers } from 'redux'
import { header } from './header'
import { categories } from './categories'
import { posts, post } from './posts'
import { comments, comment } from './comments'

export default combineReducers({
  header,
  categories,
  posts,
  comments,
  post,
  comment
})
