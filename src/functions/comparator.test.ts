import { compareArnum } from './comparator'
import { checkIoMatch } from '../util/test-util'

const testCases = [
  { input: [[1000], [1000]], expected: 0 },

  { input: [[1000], [2000]], expected: -1 },

  { input: [[2000], [1000]], expected: 1 },

  { input: [[1, 1], [2000]], expected: 1 },

  { input: [[2000], [1, 1]], expected: -1 },

  {
    input: [
      [1, 1],
      [1, 1, 1],
    ],
    expected: -1,
  },

  { input: [[1, 1], [1000000]], expected: 1 },

  {
    input: [
      [1, 1, 1],
      [1, 1, 1],
    ],
    expected: 0,
  },

  { input: [[], [1, 1, 1]], expected: -1 },

  { input: [[1, 1, 1], []], expected: 1 },

  { input: [[], []], expected: 0 },
  { input: [[], [0]], expected: 0 },
  { input: [[0], []], expected: 0 },
]

checkIoMatch('comparator.ts', [testCases], [{ description: 'compareArnum', fn: compareArnum }])
