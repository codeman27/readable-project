import { SET_COMMENTS, SET_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from './actionTypes.js'
import { getCommentsByPostId, getComment, addComment, editComment, deleteComment, postCommentVote } from '../components/ReadablesAPI'

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

export function addNewComment(id, timestamp, body, author, parentId) {
  return {
    type: ADD_COMMENT,
    payload: addComment(id, timestamp, body, author, parentId)
  }
}

export function editCurComment(id, timestamp, body) {
  return {
    type: EDIT_COMMENT,
    payload: editComment(id, timestamp, body)
  }
}

export function deleteCurComment(id, postId) {
  return {
    type: DELETE_COMMENT,
    payload: deleteComment(id, postId)
  }
}

export function voteOnComment(id, voteType, postId) {
  return {
    type: VOTE_COMMENT,
    payload: postCommentVote(id, voteType, postId)
  }
}
