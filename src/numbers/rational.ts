import { stringOption, validArgs, positivity } from '../static/ducks'
import { Arnum } from './arnum'
import { IRationalNumber } from '../static/interfaces'

class RationalNumber implements IRationalNumber {
  numer: Arnum
  denom: Arnum
  positivity: -1 | 0 | 1

  constructor(numer: validArgs, denom: string | number | Arnum, isPositive: boolean = true) {
    if (numer instanceof RationalNumber) {
      const clone = numer.clone()
      this.numer = clone.numer
      this.denom = clone.denom
      this.positivity = clone.positivity
    } else {
      this.denom = new Arnum(denom)
      if (this.denom.isZero()) throw new Error(`Invalid argument: ${denom}`)
      this.numer = new Arnum(numer)
      this.positivity = this.numer.isZero() ? 0 : isPositive ? 1 : -1
    }
  }

  valueOf() {
    return this.numer.valueOf() / this.denom.valueOf()
  }
  toString(options?: stringOption) {
    return `${this.numer}/${this.denom}`
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
    return new RationalNumber(this.numer.clone(), this.denom.clone(), this.positivity === 1)
  }
}

export default RationalNumber
