import { arnum } from '../bools/types'
import { divideArnums, double, halve } from './divide'
import { ARNUM_BASE } from '../constants/index'
import { multiplyArnums } from './multiply'
import { checkIoMatch } from '../util/test-util'

const doubleTestCases = [
  {
    input: [[1]],
    expected: [2],
  },
  {
    input: [[0, 1]],
    expected: [0, 2],
  },
  {
    input: [[ARNUM_BASE / 2]],
    expected: [0, 1],
  },
  {
    input: [[0, 0, 0, ARNUM_BASE / 2]],
    expected: [0, 0, 0, 0, 1],
  },
]

const halveTestCases = [
  {
    input: [[100]],
    expected: [50],
  },
  {
    input: [[0, 0, 0, 0, 100]],
    expected: [0, 0, 0, 0, 50],
  },
  {
    input: [[0, 1]],
    expected: [ARNUM_BASE / 2],
  },
  {
    input: [[0, ARNUM_BASE - 1]],
    expected: [ARNUM_BASE / 2, ARNUM_BASE / 2 - 1],
  },
  {
    input: [[0]],
    expected: [0],
  },
  {
    input: [[]],
    expected: [0],
  },
]

const divideTestCases = [
  {
    input: [[5], [5]],
    expected: {
      quotient: [1],
    },
  },
  {
    input: [[6], [5]],
    expected: {
      quotient: [1],
      remainder: [1],
    },
  },
  {
    input: [
      [0, 0, 0, 0, 5],
      [0, 0, 0, 0, 5],
    ],
    expected: {
      quotient: [1],
    },
  },
  {
    input: [
      [0, 0, 0, 0, 6],
      [0, 0, 0, 0, 5],
    ],
    expected: {
      quotient: [1],
      remainder: [0, 0, 0, 0, 1],
    },
  },
  {
    input: [[200], [5]],
    expected: {
      quotient: [40],
    },
  },
  {
    input: [[201], [5]],
    expected: {
      quotient: [40],
      remainder: [1],
    },
  },
  {
    input: [[0, 20000], [5]],
    expected: {
      quotient: [0, 4000],
    },
  },
  {
    input: [[0, 0, 0, 0, 20000], [5]],
    expected: {
      quotient: [0, 0, 0, 0, 4000],
    },
  },
  {
    input: [[1024], [2]],
    expected: {
      quotient: [512],
    },
  },
  {
    input: [[1024 ** 2], [2]],
    expected: {
      quotient: [512 * 1024],
    },
  },
  {
    input: [[1024 ** 2 + 1], [2]],
    expected: {
      quotient: [512 * 1024],
      remainder: [1],
    },
  },
]

checkIoMatch(
  'divide.ts',
  [
    doubleTestCases,
    doubleTestCases.map((tc) => ({ input: tc.input, expected: multiplyArnums(...tc.input, [2]) })),
    halveTestCases,
    divideTestCases,
  ],
  [
    { description: 'double', fn: double },
    { description: 'double: against multiplyArnums()', fn: double },
    { description: 'halve', fn: halve },
    { description: 'divideArnums', fn: divideArnums },
  ],
)
