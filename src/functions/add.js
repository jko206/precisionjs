// import multiply from './multiply'
import { MAX_ARNUM_DIGIT } from '../constants'

const carryToNextDigit = arnum => {
  let toCarry = 0
  const processed = arnum.map(digit => {
    const newDigit = digit + toCarry
    toCarry = Math.floor(newDigit/MAX_ARNUM_DIGIT)

    return newDigit%MAX_ARNUM_DIGIT
  })
  if(toCarry) processed.push(toCarry)
  
  return processed
}

// testing

export const addArnums = (...nums) => nums.reduce((subTotal, arnum) => {
  let total = []
  let carry = false
  while(subTotal.length || arnum.length) {
    const n1 = subTotal.shift() || 0
    const n2 = arnum.shift() || 0
    const sum = n1 + n2
    total.push(sum)
    
    if (sum >= MAX_ARNUM_DIGIT) carry = true
  }
  return carry ? carryToNextDigit(total) : total
})

