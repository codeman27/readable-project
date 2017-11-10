import { SET_POSTS, SET_CATEGORY_POSTS } from './actionTypes.js'
import {getPosts, getCategoryPosts} from '../components/ReadablesAPI'
import _ from 'lodash'

export function setPosts(sortVal, sortDir){
  return {
    type: SET_POSTS,
    payload: getPosts().then(posts => _.orderBy(posts, sortVal, sortDir))
  }
}

export function setCategoryPosts(category, sortVal, sortDir){
  return {
    type: SET_CATEGORY_POSTS,
    payload: getCategoryPosts(category).then(posts => _.orderBy(posts, sortVal, sortDir))
  }
}
