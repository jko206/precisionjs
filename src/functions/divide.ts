import { arnum } from '../bools/types'
import { comparator } from './comparator'

export const divideArnums = (
  dividend: arnum,
  divisor: arnum,
): { quotient: arnum; remainder?: arnum } => {
  const geometricSeriesOfTwo: arnum[] = []
  let double = [...divisor]
  comparator([1], [0])
  // while (comparator(double, dividend) < 1) {
  //   geometricSeriesOfTwo.push(double)
  //   double =
  // }
  return {
    quotient: [dividend[0] / divisor[0]],
  }
}
