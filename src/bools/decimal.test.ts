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

const repDecTestCases = [
  { input: '1234...3', expected: true },
  { input: '1234...3333', expected: true },
  { input: '0...3333', expected: true },
  { input: '0.123...3333', expected: true },
  { input: '0.123...333', expected: true },
  { input: '0.123...', expected: false },
  { input: '...123', expected: false },
]

checkIoMatch(
  'decimal.ts',
  [decTestCases, repDecTestCases],
  [
    { description: 'isTerminatingDec', fn: isTerminatingDec },
    { description: 'isRepeatingDec', fn: isRepeatingDec },
  ],
)
