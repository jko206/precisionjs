import { positivity, stringOption, arnum } from './ducks'

export interface INumber {
  valueOf: () => number
  toString: () => string
}

export interface IRationalNumber extends INumber {
  positivity: positivity

  numer: IWholeNumber
  denom: IWholeNumber

  isNatural: () => boolean
  isInteger: () => boolean
  isZero: () => boolean
  // isRepeatingDecimal: () => boolean
}

export interface IWholeNumber extends INumber {
  digits: arnum
}
