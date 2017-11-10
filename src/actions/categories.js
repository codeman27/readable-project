import { getCategories } from '../components/ReadablesAPI'
import { SET_CATEGORIES } from './actionTypes.js'

export function setCategories(){
  return {
    type: SET_CATEGORIES,
    payload: getCategories()
  }
}
