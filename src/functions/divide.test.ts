import { arnum } from '../bools/types'
import { divideArnums } from './divide'

type testCaseInput = {
  input: [arnum, arnum]
  expected: {
    quotient: arnum
    remainder?: arnum
  }
}

const testCases: testCaseInput[] = [
  {
    input: [[200], [5]],
    expected: {
      quotient: [40],
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
