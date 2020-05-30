// import multiply from './multiply'
import { ARNUM_BASE } from '../../static/constants'
import { validArgs, arnum } from '../../static/ducks'
import RN from '../../numbers/rational'
import multiplyArnums from '../multiply'

const carryToNextDigit = (arnum: arnum) => {
  let toCarry = 0
  const processed = arnum.map((digit) => {
    const newDigit = digit + toCarry
    toCarry = Math.floor(newDigit / ARNUM_BASE)

    return newDigit % ARNUM_BASE
  })
  if (toCarry) processed.push(toCarry)

  return processed
}

export const addTwoArnums = (a: arnum, b: arnum) => {
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

export const addArnums = (...nums: arnum[]) => nums.reduce(addTwoArnums, [0])

export const addRationalNumbers = (num1: RN, num2: RN): RN => {
  if (num1.isZero()) return new RN(num2)
  if (num2.isZero()) return new RN(num1)

  const { numer: n1, denom: d1 } = num1
  const { numer: n2, denom: d2 } = num2

  const numer = multiplyArnums(n1.digits, n2.digits)
  const denom = multiplyArnums(d1.digits, d2.digits)

  return new RN(0)
}

const add = (estimate: true | validArgs, ...nums: validArgs[]): number | RN =>
  estimate
    ? nums.map((n) => Number(n)).reduce((a, b) => a + b, 0)
    : [estimate, ...nums].map((n) => new RN(n)).reduce(addRationalNumbers, new RN(0))

export default add
