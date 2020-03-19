import isZero from './zero'

describe('isDecimal', () => {
  it('correctly identifies valid zero', () => {
    expect(isZero(0)).toBe(true)
    expect(isZero('0.')).toBe(true)
    expect(isZero('.0')).toBe(true)
    expect(isZero('.0000')).toBe(true)
    expect(isZero('0.000')).toBe(true)
    expect(isZero('000.000')).toBe(true)
    expect(isZero('00000')).toBe(true)
    
    expect(isZero(-0)).toBe(true)
    expect(isZero('-0.')).toBe(true)
    expect(isZero('-.0')).toBe(true)
    expect(isZero('-.0000')).toBe(true)
    expect(isZero('-0.000')).toBe(true)
    expect(isZero('-000.000')).toBe(true)
    expect(isZero('-00000')).toBe(true)
    
    expect(isZero('.')).toBe(false)
    expect(isZero('-.')).toBe(false)
    expect(isZero('-')).toBe(false)
    expect(isZero('0.1')).toBe(false)
    expect(isZero('0.1234567')).toBe(false)
    expect(isZero('1')).toBe(false)
    expect(isZero('1234567')).toBe(false)
  })
});