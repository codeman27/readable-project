import {CHANGE_HEADER} from '../actions/actionTypes'

const initialHeaderState = 'Readables!'

export function header (state = initialHeaderState, action) {
  switch(action.type){
    case CHANGE_HEADER:
      const {header} = action
      return header
    default: return state
  }
}
