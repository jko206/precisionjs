import { arnum } from '../static/ducks'
import { addArnums } from './add'

/**
 * @param {a} obj An array of numbers, where each index has a 0 <= number < ARNUM_BASE
 * @param {b} obj An array of numbers, where each index has a 0 <= number < ARNUM_BASE
 * @return {Array} An array of numbers, where each index has a 0 <= number < ARNUM_BASE
 *
 * ex: multiply([3,2,1], [0,1]) => [0, 3, 2, 1]
 */
const multiplyTwoArnums = (a: arnum, b: arnum): arnum => {
  const products: arnum[] = []
  a.forEach((n1, idx1) => {
    b.forEach((n2, idx2) => {
      const row = Array(idx1 + idx2).fill(0)
      row.push(n1 * n2)
      products.push(row)
    })
  })
  return addArnums(...products)
}

export const multiplyArnums = (...nums: arnum[]) => nums.reduce(multiplyTwoArnums)

export default multiplyArnums
