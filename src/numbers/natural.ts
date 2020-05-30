import { LOG_10_ARNUM_BASE, ARNUM_BASE } from '../static/constants'
import { stringOption } from '../static/ducks'
import constructorHelper from './arnum'
import { isArray } from 'util'
import { INatural } from '../static/interfaces'

const isNumber = (n: any) => typeof n === 'number'
const isString = (n: any) => typeof n === 'string'

class Natural implements INatural {
  digits: number[]

  constructor(n: number | string | Natural | number[]) {
    if (n instanceof Natural) {
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
}

export default Natural
