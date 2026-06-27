// Core AST Types
export * from './core/types';

// Functional Core Math (Tier 2)
export { add, sub, mul, div, simplify, gcd } from './core/math';

// Primitive Parser
export { parse } from './core/parser';

// Fraction Constructor (Tier 3)
export { frac } from './core/frac';

// Precision Class Wrapper
export { Precision, prec, RoundingMode } from './core/precision';
export type { FractionFormatOptions } from './core/precision';

// Tier 1 Lexer/Evaluator Compiler API
export { compile, evaluate, CompiledExpression } from './lexer/compiler';
