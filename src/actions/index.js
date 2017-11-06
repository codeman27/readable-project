export const CHANGE_HEADER = 'CHANGE_HEADER'

export function changeHeader({header}) {
  console.log(header)
  return {
    type: CHANGE_HEADER,
    header
  }
}
