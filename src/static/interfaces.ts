import { positivity, stringOption } from './ducks'

export interface INumber {
  valueOf: () => number
  toString: () => string
}

export interface IRationalNumber extends INumber {
  positivity: positivity

  numer: INatural
  denom: INatural

  isNatural: () => boolean
  isInteger: () => boolean
  isZero: () => boolean
  // isRepeatingDecimal: () => boolean
}

export interface INatural extends INumber {
  digits: number[]
}
