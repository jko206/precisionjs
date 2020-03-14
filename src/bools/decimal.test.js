import isDecimal from './decimal'

describe('isDecimal', () => {
  it('correctly identifies valid decimal', () => {
    expect(isDecimal('0.001')).toBe(true);
    expect(isDecimal('1.001')).toBe(true);
    expect(isDecimal('1234.001')).toBe(true);
    expect(isDecimal('1234.0')).toBe(true);

    expect(isDecimal('01234.0')).toBe(false);
  });

  it('correctly identifies repeating decimals', () => {
    expect(isDecimal('1234...3')).toBe(true);
    expect(isDecimal('1234...3333')).toBe(true);
    expect(isDecimal('0...3333')).toBe(true);
    expect(isDecimal('0.123...3333')).toBe(true);
    expect(isDecimal('0.123...333')).toBe(true);

    expect(isDecimal('0.123...')).toBe(false);
    expect(isDecimal('...123')).toBe(false);
  })
});