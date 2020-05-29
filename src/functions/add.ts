// import multiply from './multiply'
import { ARNUM_BASE } from '../constants'

type arnum = number[]

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

// testing

export const addArnums = (...nums: arnum[]) =>
  // prettier adds comma after the [0], which adds red underline
  // to the closing parenthesis
  // prettier-ignore
  nums.reduce(
    (subTotal, arnum) => {
      let total = []
      let carry = false
      while (subTotal.length || arnum.length) {
        const n1 = subTotal.shift() || 0
        const n2 = arnum.shift() || 0
        const sum = n1 + n2
        total.push(sum)

        if (sum >= ARNUM_BASE) carry = true
      }
      return carry ? carryToNextDigit(total) : total
    },
    [0]
  )