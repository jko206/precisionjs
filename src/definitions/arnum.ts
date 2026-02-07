import { ARNUM_BASE } from '../static/constants'

const isArnum = (num: any) =>
  Array.isArray(num) && num.every((n: any) => typeof n === 'number' && n < ARNUM_BASE)

export default isArnum
