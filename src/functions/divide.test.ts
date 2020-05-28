import { arnum } from '../bools/types'
import { divideArnums, double, halve } from './divide'
import { ARNUM_BASE } from '../constants'
import { multiplyArnums } from './multiply'

type testCaseFormat = {
  input: arnum
  expected: arnum
}
const doubleTestCases: testCaseFormat[] = [
  {
    input: [1],
    expected: [2],
  },
  {
    input: [0, 1],
    expected: [0, 2],
  },
  {
    input: [ARNUM_BASE / 2],
    expected: [0, 1],
  },
  {
    input: [0, 0, 0, ARNUM_BASE / 2],
    expected: [0, 0, 0, 0, 1],
  },
]

describe('double arnums', () => {
  doubleTestCases.forEach(({ input, expected }, index) => {
    test(`Test #${index + 1}`, () => {
      const output = double(input)
      expect(output).toEqual(expected)
    })
  })
})

describe('double arnums, against multiplyArnums()', () => {
  doubleTestCases.forEach(({ input }, index) => {
    test(`Test #${index + 1}`, () => {
      const output = double(input)
      const output2 = multiplyArnums(input, [2])
      expect(output).toEqual(output2)
    })
  })
})

const halveTestCases: testCaseFormat[] = [
  {
    input: [100],
    expected: [50],
  },
  {
    input: [0, 0, 0, 0, 100],
    expected: [0, 0, 0, 0, 50],
  },
  {
    input: [0, 1],
    expected: [ARNUM_BASE / 2],
  },
  {
    input: [0, ARNUM_BASE - 1],
    expected: [ARNUM_BASE / 2, ARNUM_BASE / 2 - 1],
  },
  {
    input: [0],
    expected: [0],
  },
  {
    input: [],
    expected: [0],
  },
]
describe('halve arnums', () => {
  halveTestCases.forEach(({ input, expected }, index) => {
    test(`Test #${index + 1}`, () => {
      const output = halve(input)
      expect(output).toEqual(expected)
    })
  })
})

type testCaseFormat2 = {
  input: [arnum, arnum]
  expected: {
    quotient: arnum
    remainder?: arnum
  }
}

const divideTestCases: testCaseFormat2[] = [
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

describe('divide arnums', () => {
  divideTestCases.forEach((testCase, index) => {
    test(`Test #${index + 1}`, () => {
      const output = divideArnums(...testCase.input)
      expect(output).toEqual(testCase.expected)
    })
  })
})
