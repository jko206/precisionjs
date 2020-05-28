import isNatural from './natural'
import { checkIoMatch } from '../util/test-util'
const naturalCases = [
  { input: '002', expected: true },
  { input: '1234567890123456789012345678901234567890', expected: true },
  { input: '12345', expected: true },
  { input: '1', expected: true },
  { input: '1.', expected: true },
  { input: '1.0', expected: true },
  { input: '1.00000000000000', expected: true },
  { input: '0', expected: false },
  { input: '000', expected: false },
  { input: '1.2', expected: false },
  { input: '0.2', expected: false },
]

checkIoMatch('natural.ts', [naturalCases], [{ description: 'isNatural', fn: isNatural }])
