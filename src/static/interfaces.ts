import { positivity, arnum } from './ducks'

export type RationalNumber = {
  positivity: positivity
  numer: WholeNumber
  denom: WholeNumber
}

export type WholeNumber = {
  digits: arnum
}

