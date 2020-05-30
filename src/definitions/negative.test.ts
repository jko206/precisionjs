import isNegative from './negative'
import { checkIoMatch } from '../util/test-util'

const cases = [
  { input: -1, expected: true },
  { input: -1e200, expected: true },
  { input: -1e-200, expected: true },
  { input: -Infinity, expected: true },
  { input: -0.0001, expected: true },
  { input: -0.0001, expected: true },
  { input: 1, expected: false },
  { input: 1e200, expected: false },
  { input: 1e-200, expected: false },
  { input: Infinity, expected: false },
  { input: 0.0001, expected: false },
  { input: 0.0001, expected: false },
]

checkIoMatch('negative.ts', [cases], [{ description: 'isNegative', fn: isNegative }])
