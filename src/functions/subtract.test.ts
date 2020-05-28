import { subtractArnums } from './subtract'
import { ARNUM_BASE } from '../constants'
import { checkIoMatch } from '../util/test-util'

const testCases = [
  { input: [[5], [1]], expected: [4] },
  { input: [[1000], [900]], expected: [100] },
  { input: [[20], [0]], expected: [20] },
  { input: [[20], []], expected: [20] },
  { input: [[0, 1], [1]], expected: [ARNUM_BASE - 1] },
  { input: [[0, 0, 0, 1], [1]], expected: [ARNUM_BASE - 1, ARNUM_BASE - 1, ARNUM_BASE - 1] },
  { input: [[1], [1]], expected: [0] },
  {
    input: [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ],
    expected: [0],
  },
  {
    input: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
    expected: [0],
  },
]

checkIoMatch('subtract.ts', [testCases], [{ description: 'subtractArnums', fn: subtractArnums }])
