import { stripZeros } from '../util/misc'
import isNatural from '../bools/natural'
import getArnum from '../numbers/natural/arnum'
import isZero from '../bools/zero'
import { ZERO } from '../constants/index'

const format = (n: string) => {
  if (n[0] === '.') return `0${n}`
  else if (n[n.length - 1] === '.') return `${n}0`
  return n
}

export const terminatingDec = (n: string) => {
  n = stripZeros(n)
  if (isNatural(n)) return getArnum(n)
  if (isZero(n)) return ZERO
  n = format(n)

  const [whole, decimal] = n.split('.')
  const denomZeros = ''.padEnd(decimal.length, '0')

  const numerator = getArnum(`${whole}${decimal}`)
  const denominator = getArnum(`1${denomZeros}`)

  return { numerator, denominator }
}

// PRE: isRepeatingDec(n) is true
export const repeatingDec = (n: string) => {
  // Split the input into terminating and repeating decimal parts
  const [front, back] = n.split('...')

  // count the number of decimal numbers in the terminating part
  // TODO: handle cases when front.match() returns null
  const termDec = (front.match(/\.\d+$/) || [])[0]
  const termDecDigitCount = termDec ? termDec.length - 1 : 0

  // count the number of repeating digits
  const repDecDigitCount = back.length

  // get realNum for terminating part
  const termDecArnum = terminatingDec(front)

  // make realNum for repeating part
  //    numerator is the arnum of repeating digits
  //    denominator is arnum that is made from the following:
  //        - number of 9s === number of repeating digits
  //        - number of 0s === number of terminating digits
  const repDecNumerator = getArnum(back)
  const nines = ''.padStart(repDecDigitCount, '9')
  const zeros = ''.padStart(termDecDigitCount, '0')
  const repDecDenominator = getArnum(`${nines}${zeros}`)
  const repDecArnum = {
    numerator: repDecNumerator,
    denominator: repDecDenominator,
  }

  return {
    repDecArnum,
    termDecArnum,
  }
}
