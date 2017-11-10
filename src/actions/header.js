import {CHANGE_HEADER} from './actionTypes.js'

export function changeHeader(header) {
  return {
    type: CHANGE_HEADER,
    header
  }
}
