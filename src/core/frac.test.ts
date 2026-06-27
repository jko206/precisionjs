import { describe, test, expect } from 'vitest';
import { frac } from './frac';
import { RationalNode } from './types';

const r = (n: number | bigint, d: number | bigint, e: number | bigint): RationalNode => ({
  type: 'rational',
  n: BigInt(n),
  d: BigInt(d),
  e: BigInt(e),
});

describe('frac constructor', () => {
  describe('1 argument', () => {
    test.each`
      val     | exp_n  | exp_d | exp_e
      ${5}    | ${5n}  | ${1n} | ${0n}
      ${"10"} | ${1n}  | ${1n} | ${1n}
      ${-3n}  | ${-3n} | ${1n} | ${0n}
    `('frac($val) === $exp_n/$exp_d * 10^$exp_e', ({ val, exp_n, exp_d, exp_e }) => {
      expect(frac(val)).toEqual(r(exp_n, exp_d, exp_e));
    });
  });

  describe('2 arguments', () => {
    test.each`
      n       | d      | exp_n  | exp_d | exp_e
      ${3}    | ${4}   | ${75n} | ${1n} | ${-2n}
      ${"-7"} | ${8}   | ${-875n}| ${1n} | ${-3n}
      ${2n}   | ${6n}  | ${1n}  | ${3n} | ${0n}
    `('frac($n, $d) === $exp_n/$exp_d * 10^$exp_e', ({ n, d, exp_n, exp_d, exp_e }) => {
      expect(frac(n, d)).toEqual(r(exp_n, exp_d, exp_e));
    });

    test('throws on decimal', () => {
      expect(() => frac(1.5, 2)).toThrow();
    });
    
    test('throws on zero denominator', () => {
      expect(() => frac(1, 0)).toThrow();
    });
  });

  describe('3 arguments (mixed fraction)', () => {
    test.each`
      w       | n      | d      | exp_n  | exp_d | exp_e
      ${3}    | ${1}   | ${4}   | ${325n}| ${1n} | ${-2n}
      ${-3}   | ${1}   | ${4}   | ${-325n}| ${1n} | ${-2n}
      ${"-0"} | ${1}   | ${2}   | ${-5n} | ${1n} | ${-1n}
      ${-0}   | ${1}   | ${2}   | ${-5n} | ${1n} | ${-1n}
      ${0}    | ${1}   | ${2}   | ${5n}  | ${1n} | ${-1n}
    `('frac($w, $n, $d) === $exp_n/$exp_d * 10^$exp_e', ({ w, n, d, exp_n, exp_d, exp_e }) => {
      expect(frac(w, n, d)).toEqual(r(exp_n, exp_d, exp_e));
    });
  });
});
