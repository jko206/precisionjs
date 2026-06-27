import { describe, test, expect } from 'vitest';
import { Precision, prec, RoundingMode } from './precision';
import { frac } from './frac';
import { div, add } from './math';

describe('Precision wrapper', () => {
  describe('toString (exact stringification)', () => {
    test.each`
      input       | expected
      ${"1/3"}    | ${"0.(3)"}
      ${"11/4"}   | ${"2.75"}
      ${"1.4(12)"}| ${"1.4(12)"}
      ${"-7/8"}   | ${"-0.875"}
      ${"100"}    | ${"100"}
      ${"1e4"}    | ${"10000"}
    `('toString of $input === $expected', ({ input, expected }) => {
      // note: parsing fraction requires frac() if strict string, but prec() accepts parse() result
      // wait, prec("1/3") is valid in primitive parser!
      expect(prec(input).toString()).toBe(expected);
    });

    test('complex fraction stringification', () => {
      // 1 / 7 = 0.(142857)
      expect(new Precision(frac(1, 7)).toString()).toBe("0.(142857)");
    });
  });

  describe('toFixed', () => {
    test('RoundHalfUp (Default)', () => {
      const val = new Precision(frac(2, 3)); // 0.666...
      expect(val.toFixed(2)).toBe("0.67");
      expect(val.toFixed(0)).toBe("1");
      expect(val.toFixed(4)).toBe("0.6667");
    });

    test('Truncate', () => {
      const val = new Precision(frac(2, 3));
      expect(val.toFixed(2, RoundingMode.Truncate)).toBe("0.66");
      expect(val.toFixed(0, RoundingMode.Truncate)).toBe("0");
    });

    test('Ceil', () => {
      const val = new Precision(frac(2, 3));
      expect(val.toFixed(2, RoundingMode.Ceil)).toBe("0.67");
      
      const negVal = new Precision(frac("-2", 3)); // -0.666...
      expect(negVal.toFixed(2, RoundingMode.Ceil)).toBe("-0.66");
    });

    test('Floor', () => {
      const val = new Precision(frac(2, 3));
      expect(val.toFixed(2, RoundingMode.Floor)).toBe("0.66");
      
      const negVal = new Precision(frac("-2", 3)); // -0.666...
      expect(negVal.toFixed(2, RoundingMode.Floor)).toBe("-0.67");
    });

    test('formatting with zero padding', () => {
      const val = prec("1.5");
      expect(val.toFixed(3)).toBe("1.500");
    });
  });

  describe('toFraction', () => {
    test('default exact fraction', () => {
      const val = prec("2.75");
      expect(val.toFraction()).toBe("11/4");
    });

    test('mixed fraction', () => {
      const val = prec("2.75");
      expect(val.toFraction({ mixed: true })).toBe("2 3/4");
    });

    test('forced denominator rounding', () => {
      const val = prec("2.75"); // 2.75 = 22 / 8
      expect(val.toFraction({ denominator: 8 })).toBe("22/8");
      
      const val2 = prec("0.33333333");
      expect(val2.toFraction({ denominator: 100 })).toBe("33/100");
      
      // 2/3 with denominator 8 => 2 * 8 / 3 = 16 / 3 = 5.333 => 5/8
      const val3 = new Precision(frac(2, 3));
      expect(val3.toFraction({ denominator: 8 })).toBe("5/8");
    });
  });

  describe('toJSON', () => {
    test('returns rational node', () => {
      const val = prec("3.14");
      const json = val.toJSON();
      expect(json).toHaveProperty('type', 'rational');
      expect(json).toHaveProperty('n');
      expect(json).toHaveProperty('d');
      expect(json).toHaveProperty('e');
    });
  });
});
