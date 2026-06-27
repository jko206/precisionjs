export enum TokenType {
  Number,
  Identifier,
  Plus,
  Minus,
  Star,
  Slash,
  Caret,
  LParen,
  RParen,
  Comma,
  EOF
}

export interface Token {
  type: TokenType;
  value: string;
  start: number;
}

const NUMBER_REGEX = /^\d+(?:\.\d*(?:\(\d+\))?)?(?:[eE][+-]?\d+)?/;
const IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*/;

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let cursor = 0;
  
  while (cursor < input.length) {
    const char = input[cursor];
    
    if (/\s/.test(char)) {
      cursor++;
      continue;
    }

    if (char === '+') { tokens.push({ type: TokenType.Plus, value: '+', start: cursor }); cursor++; continue; }
    if (char === '-') { tokens.push({ type: TokenType.Minus, value: '-', start: cursor }); cursor++; continue; }
    if (char === '*') { tokens.push({ type: TokenType.Star, value: '*', start: cursor }); cursor++; continue; }
    if (char === '/') { tokens.push({ type: TokenType.Slash, value: '/', start: cursor }); cursor++; continue; }
    if (char === '^') { tokens.push({ type: TokenType.Caret, value: '^', start: cursor }); cursor++; continue; }
    if (char === '(') { tokens.push({ type: TokenType.LParen, value: '(', start: cursor }); cursor++; continue; }
    if (char === ')') { tokens.push({ type: TokenType.RParen, value: ')', start: cursor }); cursor++; continue; }
    if (char === ',') { tokens.push({ type: TokenType.Comma, value: ',', start: cursor }); cursor++; continue; }

    const slice = input.slice(cursor);
    
    const numMatch = slice.match(NUMBER_REGEX);
    if (numMatch) {
      const matchLength = numMatch[0].length;
      tokens.push({ type: TokenType.Number, value: numMatch[0], start: cursor });
      cursor += matchLength;
      
      // Check for implicit multiplication immediately after a number (e.g. 2x)
      if (cursor < input.length) {
        let peekCursor = cursor;
        while (peekCursor < input.length && /\s/.test(input[peekCursor])) {
          peekCursor++;
        }
        if (peekCursor < input.length) {
          const nextChar = input[peekCursor];
          if (/[A-Za-z_$]/.test(nextChar) || nextChar === '(') {
            throw new Error(`Implicit multiplication is not allowed. Found "${numMatch[0]}" followed by "${nextChar}". Use explicit "*" operator.`);
          }
        }
      }
      continue;
    }

    const idMatch = slice.match(IDENTIFIER_REGEX);
    if (idMatch) {
      tokens.push({ type: TokenType.Identifier, value: idMatch[0], start: cursor });
      cursor += idMatch[0].length;
      
      // Check for implicit multiplication (e.g. x(2), where x might be a variable, wait, x(2) is indistinguishable from function call at lex time. We will catch variable(expr) in the parser or evaluator.
      // But we can check for x y -> implicit multiply
      if (cursor < input.length) {
        let peekCursor = cursor;
        while (peekCursor < input.length && /\s/.test(input[peekCursor])) {
          peekCursor++;
        }
        if (peekCursor < input.length) {
          const nextChar = input[peekCursor];
          // if it's another identifier or a number
          if (/\d/.test(nextChar)) {
             throw new Error(`Implicit multiplication is not allowed. Found "${idMatch[0]}" followed by number. Use explicit "*" operator.`);
          }
        }
      }
      continue;
    }

    throw new Error(`Unexpected character "${char}" at index ${cursor}`);
  }
  
  tokens.push({ type: TokenType.EOF, value: '', start: cursor });
  return tokens;
};
