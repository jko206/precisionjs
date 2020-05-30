import { stringOption, validArgs } from '../static/ducks'
import Natural from './natural'
import { IRationalNumber } from '../static/interfaces'

class RationalNumber implements IRationalNumber {
  numer: Natural
  denom: Natural
  positivity: -1 | 0 | 1

  constructor(n: validArgs) {
    if (n instanceof RationalNumber) {
      this.numer = new Natural(n.numer)
      this.denom = new Natural(n.denom)
      this.positivity = n.positivity
    } else if (n instanceof Natural) {
      this.numer = new Natural(n)
      this.denom = new Natural(1)
      this.positivity = 1
    } else {
      this.numer = new Natural(3)
      this.denom = new Natural(3)
      this.positivity = 1
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
}

export default RationalNumber
