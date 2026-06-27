import { PrecisionNode } from '../core/types';

export type ExprNode = 
  | LiteralExpr
  | VariableExpr
  | BinaryExpr
  | UnaryExpr
  | CallExpr;

export interface LiteralExpr {
  type: 'Literal';
  value: PrecisionNode;
}

export interface VariableExpr {
  type: 'Variable';
  name: string;
}

export interface BinaryExpr {
  type: 'Binary';
  operator: '+' | '-' | '*' | '/' | '^';
  left: ExprNode;
  right: ExprNode;
}

export interface UnaryExpr {
  type: 'Unary';
  operator: '-' | '+'; 
  right: ExprNode;
}

export interface CallExpr {
  type: 'Call';
  name: string;
  args: ExprNode[];
}
