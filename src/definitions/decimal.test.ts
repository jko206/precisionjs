import { isTerminatingDec, isRepeatingDec } from './decimal'
import { checkIoMatch } from '../util/test-util'

const decTestCases = [
  { input: '0.001', expected: true },
  { input: '1.001', expected: true },
  { input: '1234.001', expected: true },
  { input: '1234.0', expected: true },
  { input: '.12345', expected: true },
  { input: '01234.0', expected: false },
]

describe('isRepeatingDec', () => {
    test.each([
      ['1234(3)', true],
      ['1234(3333)', true],
      ['0.(3333)', true],
      ['0.123(3333)', true],
      ['0.123(333)', true],
      ['0.123()', false],
      ['(123)', false],
    ])('Test case #%# %s => %s', (input: string, expected: boolean) => {
      const output = isRepeatingDec(input)
      expect(output).toBe(expected)
    })
  })

checkIoMatch('decimal.ts', [decTestCases], [{ description: 'isTerminatingDec', fn: isTerminatingDec }])
