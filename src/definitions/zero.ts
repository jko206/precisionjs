import { arnum, validArgs } from '../static/ducks'
import { isArray } from 'util'

export const isArnumZero = (n: arnum) => isArray(n) && (!n.length || (n.length === 1 && n[0] === 0))
export const isStringZero = (n: string) =>
  /^\-?0*\.?0*$/.test(n as string) && n !== '.' && n !== '-.' && n !== '-'

export const isZero = (n: string | number | arnum) =>
  n === 0 || isStringZero(n as string) || isArnumZero(n as arnum)

export default isZero
