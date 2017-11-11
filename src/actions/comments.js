import { SET_COMMENTS, SET_COMMENT } from './actionTypes.js'
import { getCommentsByPostId, getComment } from '../components/ReadablesAPI'

export function setComments(id) {
  return {
    type: SET_COMMENTS,
    payload: getCommentsByPostId(id)
  }
}

export function setComment(id) {
  return {
    type: SET_COMMENT,
    payload: getComment(id)
  }
}
