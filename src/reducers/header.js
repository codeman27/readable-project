import {CHANGE_HEADER} from '../actions/actionTypes'

export function header (state = 'Readables!', action) {
  switch(action.type){
    case CHANGE_HEADER:
      const {header} = action
      return header
    default: return state
  }
}
