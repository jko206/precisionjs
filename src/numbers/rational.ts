import { stringOption, arnum, validArgs } from '../static/ducks'
import { WholeNumber } from './arnum'
import { IRationalNumber } from '../static/interfaces'
import isZero from '../definitions/zero'

class RationalNumber implements IRationalNumber {
  numer: WholeNumber
  denom: WholeNumber
  positivity: -1 | 0 | 1

  constructor(numer: arnum, denom: arnum = [1], isNegative: boolean = false) {
    if (isZero(denom)) {
      throw new Error(`Invalid argument denom: ${denom}. Denom can't be 0.`)
    }
    this.numer = new WholeNumber(numer)
    this.denom = new WholeNumber(denom)
    if (this.numer.isZero()) {
      this.positivity = 0
    } else {
      this.positivity = isNegative ? -1 : 1
    }
  }

  valueOf() {
    return this.numer.valueOf() / this.denom.valueOf()
  }
  toString(options?: stringOption) {
    return `${this.numer.toString()}/${this.denom.toString()}`
  }

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

  clone() {
    return new RationalNumber(
      this.numer.getDigits(),
      this.denom.getDigits(),
      this.positivity === -1,
    )
  }
}

export default RationalNumber
