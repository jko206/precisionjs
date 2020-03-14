import isSciNot from './sci-not'

describe('isSciNot', () => {
  it('returns true for scientific notation numbers', () => {
    expect(isSciNot(1.234e200)).toBe(true);
    expect(isSciNot(-1.234e200)).toBe(true);
    expect(isSciNot(-1.234e-200)).toBe(true);
    expect(isSciNot(1234e-200)).toBe(true);
    expect(isSciNot(1234e200)).toBe(true);
    expect(isSciNot(-1234e200)).toBe(true);
    expect(isSciNot(-1234e-200)).toBe(true);

    expect(isSciNot('1.234e400')).toBe(true);
    expect(isSciNot('1.234e4')).toBe(true);
    expect(isSciNot('-1.234e400')).toBe(true);
    expect(isSciNot('-1.234e4')).toBe(true);
    expect(isSciNot('-1.234e-400')).toBe(true);
    expect(isSciNot('-1.234e-4')).toBe(true);

    expect(isSciNot(1.234e400)).toBe(false); // infinity
    expect(isSciNot(1.234e4)).toBe(false); // 12340
    expect(isSciNot('-1.234e-400.2')).toBe(false);
    expect(isSciNot('-1.234e-4a')).toBe(false);
  });
});