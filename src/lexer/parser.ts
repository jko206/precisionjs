import { Token, TokenType, tokenize } from './tokens';
import { ExprNode } from './ast';
import { parse as parseNumber } from '../core/parser';

export class Parser {
  private pos = 0;

  constructor(private tokens: Token[]) {}

  private get current(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.pos++;
    return this.tokens[this.pos - 1];
  }

  private isAtEnd(): boolean {
    return this.current.type === TokenType.EOF;
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.current.type === type;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }

  public parse(): ExprNode {
    if (this.isAtEnd()) {
      throw new Error("Cannot parse empty expression");
    }
    const expr = this.expression();
    if (!this.isAtEnd()) {
      throw new Error(`Unexpected token "${this.current.value}" at index ${this.current.start}. Implicit multiplication is not allowed, use explicit operators like "*".`);
    }
    return expr;
  }

  private expression(): ExprNode {
    return this.addition();
  }

  private addition(): ExprNode {
    let expr = this.multiplication();

    while (this.match(TokenType.Plus, TokenType.Minus)) {
      const operatorToken = this.tokens[this.pos - 1];
      const right = this.multiplication();
      expr = {
        type: 'Binary',
        operator: operatorToken.type === TokenType.Plus ? '+' : '-',
        left: expr,
        right,
      };
    }

    return expr;
  }

  private multiplication(): ExprNode {
    let expr = this.exponentiation();

    while (this.match(TokenType.Star, TokenType.Slash)) {
      const operatorToken = this.tokens[this.pos - 1];
      const right = this.exponentiation();
      expr = {
        type: 'Binary',
        operator: operatorToken.type === TokenType.Star ? '*' : '/',
        left: expr,
        right,
      };
    }

    return expr;
  }

  private exponentiation(): ExprNode {
    let expr = this.unary();

    // Exponentiation is right-associative
    if (this.match(TokenType.Caret)) {
      const right = this.exponentiation(); // Recursive call handles right-associativity
      expr = {
        type: 'Binary',
        operator: '^',
        left: expr,
        right,
      };
    }

    return expr;
  }

  private unary(): ExprNode {
    if (this.match(TokenType.Minus, TokenType.Plus)) {
      const operatorToken = this.tokens[this.pos - 1];
      const right = this.unary();
      return {
        type: 'Unary',
        operator: operatorToken.type === TokenType.Minus ? '-' : '+',
        right,
      };
    }

    return this.primary();
  }

  private primary(): ExprNode {
    if (this.match(TokenType.Number)) {
      const token = this.tokens[this.pos - 1];
      return {
        type: 'Literal',
        value: parseNumber(token.value),
      };
    }

    if (this.match(TokenType.Identifier)) {
      const token = this.tokens[this.pos - 1];
      // Check for function call
      if (this.match(TokenType.LParen)) {
        const args: ExprNode[] = [];
        if (!this.check(TokenType.RParen)) {
          do {
            args.push(this.expression());
          } while (this.match(TokenType.Comma));
        }
        this.consume(TokenType.RParen, `Expected ')' after function arguments for "${token.value}"`);
        return {
          type: 'Call',
          name: token.value,
          args,
        };
      }
      
      return {
        type: 'Variable',
        name: token.value,
      };
    }

    if (this.match(TokenType.LParen)) {
      const expr = this.expression();
      this.consume(TokenType.RParen, "Expected ')' after expression");
      return expr;
    }

    throw new Error(`Expected number, variable, or '(' at index ${this.current.start}`);
  }
}

export const parseExpression = (input: string): ExprNode => {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parse();
};
