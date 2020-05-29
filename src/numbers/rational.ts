import { stringOption } from './types'
import Arnum from './arnum/index'

interface IRationalNumber {
  numer: Arnum
  denom: Arnum
  positivity: -1 | 0 | 1
  valueOf: () => number
  toString: (arg?: stringOption) => string
  clone: () => RationalNumber

  // isRepeatingDecimal: () => boolean
  // isInteger: () => boolean
  // isNatural: () => boolean
  // isZero: () => boolean
}

class RationalNumber implements IRationalNumber {
  numer: Arnum
  denom: Arnum
  positivity: -1 | 0 | 1

  constructor(n: number | string | RationalNumber) {
    this.numer = new Arnum(3)
    this.denom = new Arnum(3)
    this.positivity = 1
  }

  valueOf() {
    return 1
  }
  toString(options?: stringOption) {
    return ''
  }
  clone() {
    return new RationalNumber(this)
  }

  // isRepeatingDecimal() {
  //   return true
  // }
  // isInteger() {
  //   return true
  // }
  // isNatural() {
  //   return true
  // }
  // isZero() {
  //   return true
  // }
}

export default RationalNumber
