import { arnum } from '../static/ducks'
import { addArnums } from './add'

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

export const multiplyArnums = (...nums: arnum[]): arnum => nums.reduce(multiplyTwoArnums, [1])

export default multiplyArnums
