import { positivity, stringOption, arnum } from './ducks'

export interface INumber {
  valueOf: () => number
  toString: () => string
}

export interface IRationalNumber extends INumber {
  positivity: positivity

  numer: IWhole
  denom: IWhole

  isNatural: () => boolean
  isInteger: () => boolean
  isZero: () => boolean
  // isRepeatingDecimal: () => boolean
}

export interface IWhole extends INumber {
  digits: arnum
}
