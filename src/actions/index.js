import { SET_COMMENTS} from './actionTypes.js'
export * from './header'
export * from './categories'
export * from './posts'



export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    comments
  }
}
