export type arnum = number[]

export type integer = {
  positivity: -1 | 0 | 1
  value: arnum
}

export type rational = {
  positivity: -1 | 0 | 1
  numerator: arnum
  denominator: arnum
}
