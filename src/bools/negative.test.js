import isNegative from './negative'

describe('negative.js', () => {
  it('correctly identifies valid negative', () => {
    expect(isNegative(-1)).toBe(true)
    expect(isNegative(-1e200)).toBe(true)
    expect(isNegative(-1e-200)).toBe(true)
    expect(isNegative(-Infinity)).toBe(true)
    expect(isNegative(-0.0001)).toBe(true)
    expect(isNegative(-0.0001)).toBe(true)

    expect(isNegative(1)).toBe(false)
    expect(isNegative(1e200)).toBe(false)
    expect(isNegative(1e-200)).toBe(false)
    expect(isNegative(Infinity)).toBe(false)
    expect(isNegative(0.0001)).toBe(false)
    expect(isNegative(0.0001)).toBe(false)


  })
});