import {
  isPureInt,
  isStringInt,
  isSafeInt,
  isSafeArnumDigit,
  isSciNot,
  isSciNotInt,
  isDecimal,
} from '~/src/parser/tester';

describe('isPureInt', () => {
  it('returns true for any integer', () => {
    expect(isPureInt(123456)).toBe(true);
    expect(isPureInt(-123456)).toBe(true);
    expect(isPureInt(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
    expect(isPureInt(Number.MIN_SAFE_INTEGER - 1)).toBe(true);

    expect(isPureInt('123456')).toBe(false);
    expect(isPureInt(Infinity)).toBe(false);
  });
});
