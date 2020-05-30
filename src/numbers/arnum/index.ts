import { LOG_10_ARNUM_BASE, ARNUM_BASE } from '../../constants/index'
import { stringOption } from '../ducks'
import constructorHelper from './arnum'
import { isArray } from 'util'
interface IArnum {
  digits: number[]
  valueOf: () => number
  toString: (options: stringOption) => string
  clone: () => IArnum
}

const isNumber = (n: any) => typeof n === 'number'
const isString = (n: any) => typeof n === 'string'

class Arnum implements IArnum {
  digits: number[]

  constructor(n: number | string | Arnum | number[]) {
    if (n instanceof Arnum) {
      this.digits = [...n.digits]
    } else if (isArray(n) && n.every((digit) => isNumber(digit) && digit < ARNUM_BASE)) {
      this.digits = [...n]
    } else if (isString(n)) {
      this.digits = constructorHelper(`${n}`)
    } else {
      throw new Error(`Invalid argument ${n}`)
    }
  }

  toString(options?: stringOption) {
    return this.digits
      .reverse()
      .map((n, index) => (index ? `${n}`.padStart(LOG_10_ARNUM_BASE, '0') : `${n}`))
      .join('')
  }

  valueOf() {
    return parseInt(this.toString())
  }

  clone() {
    return new Arnum(this)
  }

  isZero() {
    const { digits } = this
    return digits.length === 0 || (digits.length === 1 && !digits[0])
  }
}

export default Arnum
