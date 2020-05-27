import { arnum } from '../bools/types'
import { divideArnums, double } from './divide'
import { ARNUM_BASE } from '../constants'
import { multiplyArnums } from './multiply'

type testCaseInput = {
  input: [arnum, arnum]
  expected: {
    quotient: arnum
    remainder?: arnum
  }
}

const testCases: testCaseInput[] = [
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
  // {
  //   input: [[0, 20000], [5]],
  //   expected: {
  //     quotient: [0, 4000],
  //   },
  // },
  {
    input: [[1024], [2]],
    expected: {
      quotient: [512],
    },
  },
]

describe('divide.ts', () => {
  testCases.forEach((testCase, index) => {
    test(`Test #${index + 1}`, () => {
      const output = divideArnums(...testCase.input)
      expect(output).toEqual(testCase.expected)
    })
  })
})

type testCaseInput2 = {
  input: arnum
  expected: arnum
}
const testCases2: testCaseInput2[] = [
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
  testCases2.forEach(({ input, expected }, index) => {
    test(`Test #${index + 1}`, () => {
      const output = double(input)
      expect(output).toEqual(expected)
    })
  })
})

describe('double arnums, against multiplyArnums()', () => {
  testCases2.forEach(({ input }, index) => {
    test(`Test #${index + 1}`, () => {
      const output = double(input)
      const output2 = multiplyArnums(input, [2])
      index === 2 && console.log(output2)
      expect(output).toEqual(output2)
    })
  })
})
