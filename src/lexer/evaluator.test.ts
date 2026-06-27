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
});
