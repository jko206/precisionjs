import { isArray } from 'util'
import { ARNUM_BASE } from '../static/constants'

const isArnum = (num: any) =>
  isArray(num) && num.every((n) => typeof n === 'number' && n < ARNUM_BASE)

export default isArnum
