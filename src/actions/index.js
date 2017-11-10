import axios from 'axios'
import * as ReadablesAPI from '../components/ReadablesAPI'
import {SET_CATEGORIES, SET_POSTS, SET_COMMENTS} from './actionTypes.js'
export * from './header'

export function setCategories(categories){
  const test = ReadablesAPI.getCategories().then(data => data.[[PromiseValue]])
  console.log(test)
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function setPosts(posts){
  return {
    type: SET_POSTS,
    posts
  }
}

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    comments
  }
}
