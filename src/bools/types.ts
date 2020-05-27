export type positivity = -1 | 0 | 1

export type arnum = number[]

export type integer = {
  positivity: positivity
  value: arnum
}

export type rational = {
  positivity: positivity
  numerator: arnum
  denominator: arnum
}
