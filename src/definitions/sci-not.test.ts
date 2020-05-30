import isSciNot from './sci-not'
import { checkIoMatch } from '../util/test-util'
const cases = [
  { input: 1.234e200, expected: true },
  { input: -1.234e200, expected: true },
  { input: -1.234e-200, expected: true },
  { input: 1234e-200, expected: true },
  { input: 1234e200, expected: true },
  { input: -1234e200, expected: true },
  { input: -1234e-200, expected: true },
  { input: '1.234e400', expected: true },
  { input: '1.234e4', expected: true },
  { input: '-1.234e400', expected: true },
  { input: '-1.234e4', expected: true },
  { input: '-1.234e-400', expected: true },
  { input: '-1.234e-4', expected: true },
  { input: 1.234e400, expected: false }, // infinity
  { input: 1.234e4, expected: false }, // 12340
  { input: '-1.234e-400.2', expected: false },
  { input: '-1.234e-4a', expected: false },
]

checkIoMatch('sci-not.ts', [cases], [{ description: 'isSciNot', fn: isSciNot }])
