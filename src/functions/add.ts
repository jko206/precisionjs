import { ARNUM_BASE } from '../static/constants'
import { arnum } from '../static/ducks'
import multiplyArnums from './multiply'
import createRationalNumber, {
  isRationalNumberZero,
  cloneRationalNumber,
  rationalNumberValueOf,
} from '../numbers/rational'
import { RationalNumber as RN } from '../static/interfaces'

const carryToNextDigit = (arnum: arnum): arnum => {
  let toCarry = 0
  const processed = arnum.map((digit) => {
    const newDigit = digit + toCarry
    toCarry = Math.floor(newDigit / ARNUM_BASE)

    return newDigit % ARNUM_BASE
  })
  if (toCarry) processed.push(toCarry)

  return processed
}

export const addTwoArnums = (a: arnum, b: arnum): arnum => {
  a = [...a]
  b = [...b]
  let total = []
  let carry = false
  while (a.length || b.length) {
    const n1 = a.shift() || 0
    const n2 = b.shift() || 0
    const sum = n1 + n2
    total.push(sum)

    if (sum >= ARNUM_BASE) carry = true
  }
  return carry ? carryToNextDigit(total) : total
}

export const addArnums = (...nums: arnum[]): arnum => nums.reduce(addTwoArnums, [0])

export const addRationalNumbers = (num1: RN, num2: RN): RN => {
  if (isRationalNumberZero(num1)) return cloneRationalNumber(num2)
  if (isRationalNumberZero(num2)) return cloneRationalNumber(num1)

  const { numer: n1, denom: d1 } = num1
  const { numer: n2, denom: d2 } = num2

  const numer = addArnums(
    multiplyArnums(n1.digits, d2.digits),
    multiplyArnums(n2.digits, d1.digits)
  )
  const denom = multiplyArnums(d1.digits, d2.digits)
  // TODO: must consider positiviity before adding or subtracting
  return createRationalNumber(numer, denom)
}

const add = (estimate: true | RN, ...nums: RN[]): number | RN => {
  if (estimate === true) {
    return nums.map((n) => rationalNumberValueOf(n)).reduce((a, b) => a + b, 0)
  } else {
    const start = estimate as RN
    return [start, ...nums].reduce(addRationalNumbers, createRationalNumber([0]))
  }
}

export default add
