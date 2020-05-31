// import multiply from './multiply'
import { ARNUM_BASE } from '../static/constants'
import { validArgs, arnum } from '../static/ducks'
import RN from '../numbers/rational'
import multiplyArnums from './multiply'
import RationalNumber from '../numbers/rational'

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
  if (num1.isZero()) return num2.clone()
  if (num2.isZero()) return num1.clone()

  const { numer: n1, denom: d1 } = num1
  const { numer: n2, denom: d2 } = num2

  const numer = multiplyArnums(n1.digits, n2.digits)
  const denom = multiplyArnums(d1.digits, d2.digits)
  // TODO: must consider positiviity before adding or subtracting
  return new RationalNumber(numer, denom)
}

const add = (estimate: true | RationalNumber, ...nums: RationalNumber[]): number | RN =>
  estimate
    ? nums.map((n) => Number(n)).reduce((a, b) => a + b, 0)
    : [estimate, ...nums].reduce(addRationalNumbers, new RationalNumber([0]))

export default add
