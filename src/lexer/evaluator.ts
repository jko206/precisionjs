import { ExprNode } from './ast';
import { PrecisionNode } from '../core/types';
import { add, sub, mul, div, pow } from '../core/math';
import { parse as parseNumber } from '../core/parser';

export type Scope = Record<string, any>;

export const evaluateAST = (node: ExprNode, scope: Scope = {}): PrecisionNode => {
  switch (node.type) {
    case 'Literal':
      return node.value;
    
    case 'Variable': {
      if (!(node.name in scope)) {
        throw new Error(`Undefined variable: ${node.name}`);
      }
      const val = scope[node.name];
      // Note: we can't do `val instanceof Precision` without importing it, but wait, we can just check if it has a .node
      if (val && typeof val === 'object' && 'node' in val && val.node && 'type' in val.node) {
        return val.node as PrecisionNode;
      }
      if (typeof val === 'object' && val !== null && 'type' in val) {
        return val as PrecisionNode;
      }
      return parseNumber(String(val));
    }
    
    case 'Unary': {
      const right = evaluateAST(node.right, scope);
      if (node.operator === '+') return right;
      if (node.operator === '-') {
        return sub({ type: 'rational', n: 0n, d: 1n, e: 0n }, right);
      }
      throw new Error(`Unknown unary operator: ${node.operator}`);
    }
    
    case 'Binary': {
      const left = evaluateAST(node.left, scope);
      const right = evaluateAST(node.right, scope);
      
      switch (node.operator) {
        case '+': return add(left, right);
        case '-': return sub(left, right);
        case '*': return mul(left, right);
        case '/': return div(left, right);
        case '^': return pow(left, right);
        default:
          throw new Error(`Unknown binary operator: ${node.operator}`);
      }
    }
    
    case 'Call': {
      const args = node.args.map(arg => evaluateAST(arg, scope));
      if (node.name === 'sqrt') {
        if (args.length !== 1) throw new Error('sqrt expects exactly 1 argument');
        return { type: 'root', index: 2, radical: args[0] };
      }
      if (node.name === 'cbrt') {
        if (args.length !== 1) throw new Error('cbrt expects exactly 1 argument');
        return { type: 'root', index: 3, radical: args[0] };
      }
      if (node.name === 'root') {
        if (args.length !== 2) throw new Error('root expects exactly 2 arguments (val, index)');
        const idxNode = args[1];
        if (idxNode.type !== 'rational' || idxNode.d !== 1n || idxNode.e !== 0n) {
           throw new Error('root index must be an exact integer');
        }
        return { type: 'root', index: Number(idxNode.n), radical: args[0] };
      }
      throw new Error(`Unknown function: ${node.name}`);
    }
  }
};
