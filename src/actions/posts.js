import { SET_POSTS, SET_CATEGORY_POSTS, SET_POST, CLEAR_POST, ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST } from './actionTypes.js'
import {getPosts, getCategoryPosts, getPost, addPost, editPost, deletePost, postVote} from '../components/ReadablesAPI'
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

export function setPost(id) {
  return {
    type: SET_POST,
    payload: getPost(id)
  }
}

export function clearPost(){
  return {
    type: CLEAR_POST,
    payload: {}
  }
}

export function addNewPost(id, timestamp, title, body, author, category){
  return {
    type: ADD_POST,
    payload: addPost(id, timestamp, title, body, author, category)
  }
}

export function editCurPost(id, title, body) {
  return {
    type: EDIT_POST,
    payload: editPost(id, title, body)
  }
}

export function deleteCurPost(id) {
  return {
    type: DELETE_POST,
    payload: deletePost(id)
  }
}

export function voteOnPost(id, voteType) {
  return {
    type: VOTE_POST,
    payload: postVote(id, voteType)
  }
}
