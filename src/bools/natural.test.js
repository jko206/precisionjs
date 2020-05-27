import isNatural from './natural'

describe('natural.js', () => {
  it('correctly identifies valid natural', () => {
    expect(isNatural('1234567890123456789012345678901234567890')).toBe(true)
    expect(isNatural('12345')).toBe(true)
    expect(isNatural('1')).toBe(true)
    expect(isNatural('1.')).toBe(true)
    expect(isNatural('1.0')).toBe(true)
    expect(isNatural('1.00000000000000')).toBe(true)

    expect(isNatural('0')).toBe(false)
    expect(isNatural('000')).toBe(false)
    expect(isNatural('1.2')).toBe(false)
  })
})
