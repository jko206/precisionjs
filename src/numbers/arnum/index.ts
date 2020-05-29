import { LOG_10_ARNUM_BASE } from '../../constants/index'
import { stringOption } from '../ducks'
import constructorHelper from './arnum'
interface IArnum {
  digits: number[]
  valueOf: () => number
  toString: (options: stringOption) => string
  clone: () => IArnum
}

class Arnum implements IArnum {
  digits: number[]

  constructor(n: number | string | Arnum) {
    if (n instanceof Arnum) {
      this.digits = [...n.digits]
    } else {
      this.digits = constructorHelper(`${n}`)
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
}

export default Arnum
