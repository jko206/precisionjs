import isZero from './zero'
import { checkIoMatch } from '../util/test-util'

const cases = [
  { input: 0, expected: true },
  { input: '0.', expected: true },
  { input: '.0', expected: true },
  { input: '.0000', expected: true },
  { input: '0.000', expected: true },
  { input: '000.000', expected: true },
  { input: '00000', expected: true },
  { input: -0, expected: true },
  { input: '-0.', expected: true },
  { input: '-.0', expected: true },
  { input: '-.0000', expected: true },
  { input: '-0.000', expected: true },
  { input: '-000.000', expected: true },
  { input: '-00000', expected: true },
  { input: '.', expected: false },
  { input: '-.', expected: false },
  { input: '-', expected: false },
  { input: '0.1', expected: false },
  { input: '0.1234567', expected: false },
  { input: '1', expected: false },
  { input: '1234567', expected: false },
]

checkIoMatch('zero.ts', [cases], [{ description: 'isZero', fn: isZero }])
