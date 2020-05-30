import { positivity, stringOption, arnum } from './ducks'

export interface INumber {
  valueOf: () => number
  toString: () => string
}

export interface IRationalNumber extends INumber {
  positivity: positivity

  numer: IArnum
  denom: IArnum

  isNatural: () => boolean
  isInteger: () => boolean
  isZero: () => boolean
  // isRepeatingDecimal: () => boolean
}

export interface IArnum extends INumber {
  digits: arnum
}
