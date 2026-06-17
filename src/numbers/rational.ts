import { stringOption, arnum, validArgs } from '../static/ducks'
import {
  createWholeNumber,
  isWholeNumberZero,
  wholeNumberValueOf,
  wholeNumberToString,
  getWholeNumberDigits,
} from './arnum'
import { RationalNumber } from '../static/interfaces'
import isZero from '../definitions/zero'

export const createRationalNumber = (
  numer: arnum,
  denom: arnum = [1],
  isNegative: boolean = false,
): RationalNumber => {
  if (isZero(denom)) {
    throw new Error(`Invalid argument denom: ${denom}. Denom can't be 0.`)
  }
  const numerWhole = createWholeNumber(numer)
  const denomWhole = createWholeNumber(denom)
  let positivity: -1 | 0 | 1
  if (isWholeNumberZero(numerWhole)) {
    positivity = 0
  } else {
    positivity = isNegative ? -1 : 1
  }
  return {
    numer: numerWhole,
    denom: denomWhole,
    positivity,
  }
}

export const rationalNumberValueOf = (rn: RationalNumber) => {
  if (rn.positivity === 0) return 0
  return rn.positivity * (wholeNumberValueOf(rn.numer) / wholeNumberValueOf(rn.denom))
}

export const rationalNumberToString = (rn: RationalNumber, options?: stringOption) => {
  if (rn.positivity === 0) return '0'
  const sign = rn.positivity === -1 ? '-' : ''
  const numerStr = wholeNumberToString(rn.numer)
  if (isWholeNumberZero(rn.denom) || (rn.denom.digits.length === 1 && rn.denom.digits[0] === 1)) {
    return `${sign}${numerStr}`
  }
  return `${sign}${numerStr}/${wholeNumberToString(rn.denom)}`
}

export const isRationalNumberInteger = (rn: RationalNumber) => {
  const denom = rn.denom.digits
  return denom.length === 1 && denom[0] === 1
}

export const isRationalNumberNatural = (rn: RationalNumber) => {
  return rn.positivity === 1 && isRationalNumberInteger(rn)
}

export const isRationalNumberZero = (rn: RationalNumber) => {
  return rn.positivity === 0
}

export const cloneRationalNumber = (rn: RationalNumber) => {
  return createRationalNumber(
    getWholeNumberDigits(rn.numer),
    getWholeNumberDigits(rn.denom),
    rn.positivity === -1,
  )
}

export default createRationalNumber
