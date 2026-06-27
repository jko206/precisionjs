import { parseExpression } from './parser';
import { evaluateAST, Scope } from './evaluator';
import { Precision } from '../core/precision';
import { ExprNode } from './ast';

export class CompiledExpression {
  constructor(private ast: ExprNode) {}

  public evaluate(scope?: Scope): Precision {
    const precisionNode = evaluateAST(this.ast, scope);
    return new Precision(precisionNode);
  }
}

export const compile = (expression: string): CompiledExpression => {
  const ast = parseExpression(expression);
  return new CompiledExpression(ast);
};

export const evaluate = (expression: string, scope?: Scope): Precision => {
  return compile(expression).evaluate(scope);
};
