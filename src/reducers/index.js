import {
  CHANGE_HEADER,
} from '../actions'

const initialHeaderState = {
  header: 'Readables!'
}

function header (state = initialHeaderState, action) {
  const {header} = action
  switch(action.type){
    case CHANGE_HEADER :
      return {...state, header}
    default: return state
  }
}

export default header
