import {
  isTerminatingDec,
  isRepeatingDec,
} from './decimal'

describe('isDecimal', () => {
  it('correctly identifies valid decimal', () => {
    expect(isTerminatingDec('0.001')).toBe(true);
    expect(isTerminatingDec('1.001')).toBe(true);
    expect(isTerminatingDec('1234.001')).toBe(true);
    expect(isTerminatingDec('1234.0')).toBe(true);
    expect(isTerminatingDec('.12345')).toBe(true);

    expect(isTerminatingDec('01234.0')).toBe(false);
  });

  it('correctly identifies repeating decimals', () => {
    expect(isRepeatingDec('1234...3')).toBe(true);
    expect(isRepeatingDec('1234...3333')).toBe(true);
    expect(isRepeatingDec('0...3333')).toBe(true);
    expect(isRepeatingDec('0.123...3333')).toBe(true);
    expect(isRepeatingDec('0.123...333')).toBe(true);

    expect(isRepeatingDec('0.123...')).toBe(false);
    expect(isRepeatingDec('...123')).toBe(false);
  })
});