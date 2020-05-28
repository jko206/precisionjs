import multiplyArnums from './multiply'
import arnum from '../util/arnum'
import { checkIoMatch } from '../util/test-util'

const n1 = arnum('2000000600000100000006')
const n2 = arnum('30670611727837901192')
const n3 = arnum('81126840202085220867')
const n4 = arnum('2488209816544506301085316034759042573464')
const n5 = arnum('605881025935900057632270154397334802003')
const n6 = arnum('5534011216879981365928981304952000318')
const n7 = arnum('5667248510129402406278002221897072087915')
const n8 = arnum('2866181414294083680568129177973394313695')
// prettier-ignore
const n9 = arnum(
  `
  544632206716623191473040301766600788533239909190
  192125019233311497202293670292028914059190056058
  662810760562701308149160355411634875474764384418
  55213412450`.replace(/\s/g, '')
)

const testCases = [
  { input: [[3, 2, 1], [1]], expected: [3, 2, 1] },
  { input: [[1], [3, 2, 1]], expected: [3, 2, 1] },
  {
    input: [
      [3, 2, 1],
      [0, 1],
    ],
    expected: [0, 3, 2, 1],
  },
  {
    input: [
      [0, 1],
      [3, 2, 1],
    ],
    expected: [0, 3, 2, 1],
  },
  {
    input: [
      [3, 2, 1],
      [0, 2],
    ],
    expected: [0, 6, 4, 2],
  },
  {
    input: [
      [0, 2],
      [3, 2, 1],
    ],
    expected: [0, 6, 4, 2],
  },
  {
    input: [
      [3, 2, 1],
      [2, 2],
    ],
    expected: n1,
  },
  {
    input: [n2, n3],
    expected: n4,
  },
  {
    input: [n5, n6, n7, n8],
    expected: n9,
  },
]

checkIoMatch('multiply.js', [testCases], [{ description: 'multiplyArnums', fn: multiplyArnums }])
