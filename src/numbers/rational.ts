import { stringOption } from './ducks'
import Arnum from './arnum/index'

interface IRationalNumber {
  numer: Arnum
  denom: Arnum
  positivity: -1 | 0 | 1
  valueOf: () => number
  toString: (arg?: stringOption) => string
  clone: () => RationalNumber

  // isRepeatingDecimal: () => boolean
  isInteger: () => boolean
  isNatural: () => boolean
  isZero: () => boolean
}

class RationalNumber implements IRationalNumber {
  numer: Arnum
  denom: Arnum
  positivity: -1 | 0 | 1

  constructor(n: number | string | RationalNumber) {
    if (n instanceof RationalNumber) {
      this.numer = n.numer
      this.denom = n.denom
      this.positivity = n.positivity
    } else {
      this.numer = new Arnum(3)
      this.denom = new Arnum(3)
      this.positivity = 1
    }
  }

  valueOf() {
    return this.numer.valueOf() / this.denom.valueOf()
  }
  toString(options?: stringOption) {
    return `${this.numer}/${this.denom}`
  }
  clone() {
    return new RationalNumber(this)
  }

  // isRepeatingDecimal() {
  //   return true
  // }
  isInteger() {
    const denom = this.denom.digits
    return denom.length === 1 && denom[0] === 1
  }
  isNatural() {
    return this.positivity === 1 && this.isInteger()
  }
  isZero() {
    return this.positivity === 0
  }
}

export default RationalNumber
