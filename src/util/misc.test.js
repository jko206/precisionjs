import { stripZeros } from './misc'

describe('util/misc.js', () => {
  test('stripZeros()', () => {
    expect(stripZeros('2.')).toBe('2')

    expect(stripZeros('0002')).toBe('2')

    expect(stripZeros('0002.0000')).toBe('2')

    expect(stripZeros('000250000000')).toBe('250000000')
  })
})