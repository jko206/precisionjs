// import multiply from './multiply'
import { MAX_ARNUM_DIGIT } from '../constants'

const carryToNextDigit = arnum => {
  let toCarry = 0
  const processed = arnum.map(digit => {
    const newDigit = digit%MAX_ARNUM_DIGIT + toCarry
    toCarry = Math.floor(digit/MAX_ARNUM_DIGIT)
    return newDigit
  })
  while(toCarry > MAX_ARNUM_DIGIT) {
    processed.push(toCarry%MAX_ARNUM_DIGIT)
    toCarry = Math.floor(toCarry/MAX_ARNUM_DIGIT)
  }
  if(toCarry) processed.push(toCarry)
  return processed
}

export const addArnums = (...nums) => carryToNextDigit(nums.reduce((subTotal, arnum, index) => {
  const total = []
  while(subTotal.length || arnum.length) {
    const n1 = subTotal.shift() || 0
    const n2 = arnum.shift() || 0
    total.push(n1 + n2)
  }
  return index%(MAX_ARNUM_DIGIT / 10) === 0 
    ? carryToNextDigit(total) 
    : total 
}, [0]))

