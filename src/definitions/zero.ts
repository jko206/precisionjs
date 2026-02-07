import { arnum, validArgs } from '../static/ducks'

export const isArnumZero = (n: arnum) =>
  Array.isArray(n) && (!n.length || (n.length === 1 && n[0] === 0))
export const isStringZero = (n: string) =>
  /^\-?0*\.?0*$/.test(n) && n !== '.' && n !== '-.' && n !== '-'

export const isZero = (n: string | number | arnum) =>
  n === 0 || isStringZero(n as string) || isArnumZero(n as arnum)

export default isZero
