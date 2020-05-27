import { arnum } from '../bools/types'
import { compareArnum } from './comparator'
import { multiplyArnums } from './multiply'
import { subtractArnums } from './subtract'
import { addArnums } from './add'
import { ARNUM_BASE } from '../constants'

const isZero = (num: arnum) => num.length === 1 && num[0] === 0
type doubleFactorValue = [arnum, arnum]

export const divideArnums = (
  dividend: arnum,
  divisor: arnum,
): { quotient: arnum; remainder?: arnum } => {
  const geometricSeriesOfTwo: doubleFactorValue[] = []
  let doubleValue = [...divisor] as arnum
  let doubleFactor = [1]
  while (compareArnum(doubleValue, dividend) < 1) {
    geometricSeriesOfTwo.push([doubleFactor, doubleValue])
    doubleValue = multiplyArnums(doubleValue, [2])
    doubleFactor = multiplyArnums(doubleFactor, [2])
  }
  const toSum: arnum[] = []
  while (geometricSeriesOfTwo.length) {
    ;[doubleFactor, doubleValue] = geometricSeriesOfTwo.pop() as doubleFactorValue
    if (compareArnum(dividend, doubleValue) > -1) {
      toSum.push(doubleFactor)
      dividend = subtractArnums(dividend, doubleValue)
      if (isZero(dividend)) break
    }
  }

  return {
    quotient: addArnums(...toSum),
    ...(!isZero(dividend) && { remainder: dividend }),
  }
}

export const double = (num: arnum) => {
  let toCarry = 0
  num = num
    .map((n) => n * 2)
    .map((n) => {
      const val = n + toCarry
      toCarry = Math.floor(val / ARNUM_BASE)
      const newVal = val % ARNUM_BASE

      return val % ARNUM_BASE
    })
  if (toCarry) num.push(toCarry)

  return num
}

export const halve = (num: arnum) => {
  return num.map((n) => n / 2).map((n) => {})
}
