import { LOG_10_ARNUM_BASE } from '../static/constants'
import { arnum } from '../static/ducks'
import { INumber, IArnum } from '../static/interfaces'

function getArnum(str: string): arnum {
  let arr = []
  while (str.length > LOG_10_ARNUM_BASE) {
    const chunk = str.substring(str.length - LOG_10_ARNUM_BASE)
    arr.push(chunk)
    str = str.substring(0, str.length - LOG_10_ARNUM_BASE)
  }
  arr.push(str)
  arr = arr.map((digit) => parseInt(digit))
  while (arr[arr.length - 1] === 0) arr.pop()
  return arr
}

export class Arnum implements IArnum {
  digits: arnum
  constructor(arg: arnum | string | number | Arnum) {
    this.digits = [1]
  }
  valueOf() {
    return 0
  }
  toString() {
    return ''
  }

  isZero() {
    return !this.digits.length || (this.digits.length === 1 && this.digits[0] === 0)
  }

  clone() {
    return new Arnum([...this.digits])
  }
}

export default getArnum
