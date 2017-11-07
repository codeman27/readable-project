export const CHANGE_HEADER = 'CHANGE_HEADER'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function changeHeader(header) {
  return {
    type: CHANGE_HEADER,
    header
  }
}

export function getCategories(categories){
  return {
    type: GET_CATEGORIES,
    categories
  }
}
