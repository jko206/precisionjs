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

checkIoMatch(
  'fraction.ts',
  [fracCases, mixedNumCases],
  [
    { description: 'isFraction: regular fractions', fn: isFraction },
    { description: 'isFraction: mixed numbers', fn: isFraction },
  ],
)
