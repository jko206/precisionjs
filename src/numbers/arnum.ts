import { ARNUM_BASE, LOG_10_ARNUM_BASE, ZERO } from '../static/constants'
import { arnum, validArgs } from '../static/ducks'
import { WholeNumber } from '../static/interfaces'
import { isArnumZero } from '../definitions/zero'

function getArnum(str: string): arnum {
  let arr = []
  while (str.length > LOG_10_ARNUM_BASE) {
    const chunk = str.substring(str.length - LOG_10_ARNUM_BASE)
    arr.push(chunk)
    str = str.substring(0, str.length - LOG_10_ARNUM_BASE)
  }
  arr.push(str)
  arr = arr.map((digit) => parseInt(digit))
  while (arr[arr.length - 1] === 0) arr.pop()
  return arr
}

export const createWholeNumber = (n: arnum): WholeNumber => ({ digits: n })

export const wholeNumberValueOf = (wn: WholeNumber) => {
  return wn.digits.reduce((acc, digit, index) => acc + digit * Math.pow(ARNUM_BASE, index), 0)
}

export const wholeNumberToString = (wn: WholeNumber) => {
  if (isWholeNumberZero(wn) || wn.digits.length === 0) return '0'
  const strings = wn.digits.map((n) => n.toString())
  const last = strings.pop() as string
  return last + strings.map((s) => s.padStart(LOG_10_ARNUM_BASE, '0')).reverse().join('')
}

export const isWholeNumberZero = (wn: WholeNumber) => {
  return isArnumZero(wn.digits)
}

export const getWholeNumberDigits = (wn: WholeNumber) => {
  return [...wn.digits]
}

export const cloneWholeNumber = (wn: WholeNumber) => {
  return createWholeNumber([...wn.digits])
}

export default getArnum
