import RationalNumber from '../numbers/rational'
import { Arnum } from '../numbers/arnum'

export type stringOption = {
  form: 'decimal' | 'fraction' | 'mixedNumber' | 'scientific'
  mixedNumber: boolean // only if fraction
  roundMethod: 'round' | 'floor' | 'ceil'
  roundTo: 'repeat' | number // 2 => 10^2 => round to 100th, -2 => 0.01 => round to 0.01th
}

export type validArgs = string | number | RationalNumber | Arnum

export type arnum = number[]

export type positivity = -1 | 0 | 1
