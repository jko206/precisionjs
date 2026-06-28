import { describe, test, expect } from 'vitest';
import { evaluate } from './compiler';
import { Precision } from '../core/precision';
import { RationalNode, RootNode } from '../core/types';

describe('Lexer / Evaluator', () => {
  test('basic arithmetic (PEMDAS)', () => {
    // 2 + 3 * 4 = 14
    expect(evaluate('2 + 3 * 4').toString()).toBe('14');
    
    // (2 + 3) * 4 = 20
    expect(evaluate('(2 + 3) * 4').toString()).toBe('20');
    
    // 10 / 2 - 3 = 2
    expect(evaluate('10 / 2 - 3').toString()).toBe('2');
    
    // 2 ^ 3 ^ 2 = 512 (right-associative)
    expect(evaluate('2 ^ 3 ^ 2').toString()).toBe('512');
  });

  test('unary minus', () => {
    expect(evaluate('-5 + 3').toString()).toBe('-2');
    expect(evaluate('5 * -2').toString()).toBe('-10');
    expect(evaluate('-(3 + 4)').toString()).toBe('-7');
  });

  test('variables injected via scope', () => {
    const scope = { mass: 10, velocity: 5, z: new Precision('0.(3)') };
    
    // Kinetic energy: (mass * velocity^2) / 2
    expect(evaluate('(mass * velocity^2) / 2', scope).toString()).toBe('125');
    
    // With precision object in scope
    expect(evaluate('z * 3', scope).toString()).toBe('1');
  });

  test('math functions', () => {
    // Math functions return RootNode. We can inspect the internal node.
    const r1 = evaluate('sqrt(16)');
    expect(r1.node.type).toBe('root');
    if (r1.node.type === 'root') {
      expect(r1.node.index).toBe(2);
      expect((r1.node.radical as RationalNode).n).toBe(16n);
    }
    
    const r2 = evaluate('cbrt(8)');
    expect(r2.node.type).toBe('root');
    if (r2.node.type === 'root') {
      expect(r2.node.index).toBe(3);
    }
    
    const r3 = evaluate('root(32, 5)');
    expect(r3.node.type).toBe('root');
    if (r3.node.type === 'root') {
      expect(r3.node.index).toBe(5);
      expect((r3.node.radical as RationalNode).n).toBe(32n);
    }
  });

  test('implicit multiplication throws error', () => {
    expect(() => evaluate('2x', { x: 3 })).toThrow(/Implicit multiplication is not allowed/);
    expect(() => evaluate('2(3)')).toThrow(/Implicit multiplication is not allowed/);
    expect(() => evaluate('x y', { x: 2, y: 3 })).toThrow(/Unexpected token/);
  });
  
  test('unsupported root addition throws error', () => {
    expect(() => evaluate('sqrt(2) + 3')).toThrow(/Unsupported operation on non-rational node/);
  });

  describe('complex expressions', () => {
    test.each`
      expr                                          | expected
      ${'2 + 3 * 4 ^ 2 - 10 / 5'}                   | ${'48'}
      ${'(((2 + 3) * 4) - 5) ^ 2'}                  | ${'225'}
      ${'2 ^ 3 ^ 2'}                                | ${'512'}
      ${'-2 ^ 4'}                                   | ${'16'} 
      ${'10^10 * 10^-5'}                            | ${'100000'}
      ${'1.5e3 * 0.(3) + 4 / 8'}                    | ${'500.5'}
      ${'(1 + 2) * (3 + 4) / (5 + 2)'}              | ${'3'}
      ${'0.1 + 0.2'}                                | ${'0.3'}
      ${'1/3 + 1/3 + 1/3'}                          | ${'1'}
      ${'(0.123456789 * 9) / 9'}                    | ${'0.123456789'}
      ${'(2^10) * (5^10)'}                          | ${'10000000000'}
    `('evaluate("$expr") === $expected', ({ expr, expected }) => {
      expect(evaluate(expr).toString()).toBe(expected);
    });

    test('complex variable injection', () => {
      const scope = { a: 1.5, b: 2, c: 3, d: 0.5, e: 2, f: -1 };
      // a * b / c + d - e^f = 1.5 * 2 / 3 + 0.5 - 2^-1 = 3/3 + 0.5 - 0.5 = 1
      expect(evaluate('a * b / c + d - e^f', scope).toString()).toBe('1');
      
      const geomScope = { x: 3, y: 4 };
      // Math functions evaluate their arguments first, so sqrt(25) works!
      const result = evaluate('sqrt(x^2 + y^2)', geomScope);
      expect(result.node.type).toBe('root');
      if (result.node.type === 'root') {
        expect(result.node.index).toBe(2);
        expect((result.node.radical as RationalNode).n).toBe(25n);
      }
    });
  });

  describe('extreme edge cases and limits', () => {
    test.each`
      expr                                          | expected
      ${'0.(001) * 999'}                            | ${'1'}
      ${'-0.(142857) * 7'}                          | ${'-1'}
      ${'1e200 * 1e-200 + 1'}                       | ${'2'}
      ${'(2 ^ 100) / (2 ^ 99)'}                     | ${'2'}
      ${'(-1) ^ 101'}                               | ${'-1'}
      ${'(-1) ^ 100'}                               | ${'1'}
      ${'(0.(3) + -1.5) * 6'}                       | ${'-7'}
      ${'0.(9) * 5'}                                | ${'5'}
      ${'-2.5e-3 * -400'}                           | ${'1'}
      ${'1.25e100 * 8e-100'}                        | ${'10'}
      ${'1 / 3 * 3'}                                | ${'1'}
    `('evaluate("$expr") === $expected', ({ expr, expected }) => {
      expect(evaluate(expr).toString()).toBe(expected);
    });

    test('complex variable injection with frac() and repeating decimals', () => {
      // Note: testing frac injection which bypasses parser limitations!
      const scope = { 
        m_frac: { type: 'rational', n: -7n, d: 3n, e: 0n }, // -7/3 equivalent to frac({ whole: -2, n: 1, d: 3 })
        massive: new Precision('1e300'),
        repeat: new Precision('-0.(9)'), // effectively -1
      };
      
      expect(evaluate('m_frac * 3', scope).toString()).toBe('-7');
      expect(evaluate('massive / 1e299', scope).toString()).toBe('10');
      expect(evaluate('repeat + 2', scope).toString()).toBe('1');
    });
  });
});
