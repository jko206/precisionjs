import isFraction from './fraction'
import { checkIoMatch } from '../util/test-util'

const fracCases = [
  { input: '2/3', expected: true },
  { input: '0/3', expected: true },
  { input: '0/123', expected: true },
  { input: '123456789/3', expected: true },
  { input: '123456789/1', expected: true },
  { input: '1/0', expected: false },
  { input: '12345/0', expected: false },
  { input: '1/', expected: false },
  { input: '123/', expected: false },
  { input: '/123', expected: false },
  { input: '/1', expected: false },
  { input: '1.23/2', expected: false },
  { input: '1/2.345', expected: false },
]

const mixedNumCases = [
  { input: '99 2/3', expected: true },
  { input: '99 2/3', expected: true },
  { input: '99 0/3', expected: true },
  { input: '99 0/123', expected: true },
  { input: '99 123456789/3', expected: true },
  { input: '99 123456789/1', expected: true },
  { input: '0 2/3', expected: true },
  { input: '0 0/3', expected: true },
  { input: '0 0/123', expected: true },
  { input: '0 123456789/3', expected: true },
  { input: '0 123456789/1', expected: true },
  { input: '1 1/0', expected: false },
  { input: '1 12345/0', expected: false },
  { input: '1 1/', expected: false },
  { input: '1 123/', expected: false },
  { input: '1 /123', expected: false },
  { input: '1 /1', expected: false },
  { input: '1 1.23/2', expected: false },
  { input: '1 1/2.345', expected: false },
  { input: '1.24 1/0', expected: false },
  { input: '1.24 12345/0', expected: false },
  { input: '1.24 1/', expected: false },
  { input: '1.24 123/', expected: false },
  { input: '1.24 /123', expected: false },
  { input: '1.24 /1', expected: false },
  { input: '1.24 1.23/2', expected: false },
  { input: '1.24 1/2.345', expected: false },
]

const edgeCases = [
  // 1. The "Human Logic" Negative
  { input: '-1 1/2', expected: true }, // Should represent -1.5
  { input: '-2/3', expected: true },
  { input: '+1 1/2', expected: true }, // Should represent 1.5
  { input: '+2/3', expected: true },

  // 2. Weird Whitespace
  { input: '1   1/2', expected: true }, // Multiple internal spaces
  { input: ' 1 1/2 ', expected: true }, // Leading/Trailing

  // 3. The "Sign Conflict" (Invalid)
  { input: '1 -1/2', expected: false }, // "One minus half"? That's an expression.
  { input: '1 +1/2', expected: false }, // "One plus half"? That's an expression.

  // 4. The "Double Fraction" (Invalid)
  { input: '1/2/3', expected: false },
]

checkIoMatch(
  'fraction.ts',
  [fracCases, mixedNumCases, edgeCases],
  [
    { description: 'isFraction: regular fractions', fn: isFraction },
    { description: 'isFraction: mixed numbers', fn: isFraction },
  ],
)
