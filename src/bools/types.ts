type arnum = number[]

type integer = {
  positivity: -1 | 0 | 1
  value: arnum
}

type rational = {
  positivity: -1 | 0 | 1
  numerator: arnum
  denominator: arnum
}
