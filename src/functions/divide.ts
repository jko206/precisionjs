import { arnum } from '../bools/types'
import { compareArnum } from './comparator'
import { multiplyArnums } from './multiply'
import { subtractArnums } from './subtract'
import { addArnums } from './add'
import { ARNUM_BASE } from '../constants'

const isZero = (num: arnum) => !num.length || (num.length === 1 && num[0] === 0)

export const double = (num: arnum) => {
  if (isZero(num)) return [0]
  let toCarry = 0
  num = num
    .map((n) => n * 2)
    .map((n) => {
      const val = n + toCarry
      toCarry = Math.floor(val / ARNUM_BASE)

      return val % ARNUM_BASE
    })
  if (toCarry) num.push(toCarry)

  return num
}

export const halve = (num: arnum) => {
  if (isZero(num)) return [0]
  if (num.length === 1 && num[0] === 1) throw new Error(`Can't halve 1`)
  num = num
    .map((n) => n / 2)
    .reverse()
    .map((n, i, arr) => {
      const floored = Math.floor(n)
      if (n !== floored) {
        arr[i + 1] += ARNUM_BASE * 0.5
        return floored
      }
      return n
    })

  while (!num[0]) num.shift()

  return num.reverse()
}

export const divideArnums = (
  dividend: arnum,
  divisor: arnum,
): { quotient: arnum; remainder?: arnum } => {
  if (isZero(divisor)) throw new Error(`Invalid argument. Divisor's value cannot be 0`)

  let doubleValue = [...divisor] as arnum
  let doubleFactor = [1]

  while (compareArnum(doubleValue, dividend) === -1) {
    doubleValue = double(doubleValue)
    doubleFactor = double(doubleFactor)
  }
  const toSum: arnum[] = []

  while (compareArnum(doubleFactor, [1]) > -1) {
    if (compareArnum(dividend, doubleValue) > -1) {
      toSum.push(doubleFactor)
      dividend = subtractArnums(dividend, doubleValue)
    }
    doubleValue = halve(doubleValue)
    try {
      doubleFactor = halve(doubleFactor)
    } catch {
      break
    }
    if (isZero(dividend)) break
  }

  return {
    quotient: addArnums(...toSum),
    ...(!isZero(dividend) && { remainder: dividend }),
  }
}
