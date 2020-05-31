import { LOG_10_ARNUM_BASE, ZERO } from '../static/constants'
import { arnum, validArgs } from '../static/ducks'
import { IWholeNumber } from '../static/interfaces'
import { isArnumZero } from '../definitions/zero'

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

export class WholeNumber implements IWholeNumber {
  digits: arnum
  constructor(n: arnum) {
    this.digits = n
  }
  valueOf() {
    return 0
  }
  toString() {
    return ''
  }

  isZero() {
    return isArnumZero(this.digits)
  }

  getDigits() {
    return [...this.digits]
  }

  clone() {
    return new WholeNumber([...this.digits])
  }
}

export default getArnum
