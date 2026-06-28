# Precision JS

Precision JS is a JavaScript library for arbitrary-precision arithmetic and math expression
evaluation.

## Features

- Arbitrary-precision rational numbers
- Exact decimal representation with repeating decimals support
- Lexer/parser for math expressions
- Evaluator with PEMDAS and Math functions support
- Scope-based variable injection
- Extreme edge case handling

## Installation

```bash
npm install precisionjs
```

## Usage

### Creating Precision Numbers

```javascript
import { Precision } from './core/precision'

const p1 = new Precision('0.333333') // Exact decimal
const p2 = new Precision('0.(3)') // Repeating decimal (1/3)
const p3 = new Precision('123.45e-2') // Scientific notation
const p4 = new Precision(1 / 3) // From float (results in exact decimal)
const p5 = Precision.fromParts(22, 7) // From numerator/denominator
```

### Rational Constructor

```javascript
import { r } from './core/precision'

const rational = r(1, 3) // Creates RationalNode { type: 'rational', n: 1n, d: 3n, e: 0n }
```

### Pre-Compiling Expressions

```javascript
import { compile } from './lexer/compiler'

const formula = compile('sqrt(16) + x')
const result = formula.evaluate({ x: 2 })
```

### Evaluating Expressions

```javascript
import { evaluate } from './lexer/evaluator'
import { Precision } from './core/precision'

// Basic arithmetic
const result1 = evaluate('2 + 3 * 4 ^ 2 - 10 / 5')
console.log(result1.toString()) // '48'

// With variables
const scope = { mass: 10, velocity: 5 }
const result2 = evaluate('(mass * velocity^2) / 2', scope)
console.log(result2.toString()) // '125'

// Math functions
const result3 = evaluate('sqrt(16) + cbrt(8)')
console.log(result3.toString()) // '4'
```

### Direct Rational Arithmetic

```javascript
import { add, mul, div, pow, simplify } from './core/math'
import { frac } from './core/frac'

const r1 = frac({ whole: 0, n: 1, d: 3 })
const r2 = frac({ whole: 0, n: 1, d: 6 })

const sum = add(r1, r2) // { type: 'rational', n: 1n, d: 2n, e: 0n }
const product = mul(r1, r2) // { type: 'rational', n: 1n, d: 18n, e: 0n }

// Simplification
const simplified = simplify(product)

// Power operations
const power = pow(frac({ whole: 2 }), frac({ whole: 3 })) // { type: 'rational', n: 8n, d: 1n, e: 0n }
```

## Project Structure

```
precisionjs/
├── src/
│   ├── core/
│   │   ├── types.ts         # AST Definitions
│   │   ├── precision.ts     # Precision wrapper class
│   │   ├── parser.ts        # Strict primitive parser
│   │   ├── math.ts          # Pure functional arithmetic operations
│   │   └── frac.ts          # Safe fraction constructor
│   ├── lexer/
│   │   ├── tokens.ts        # Token definitions
│   │   ├── parser.ts        # Recursive-descent AST parser
│   │   ├── evaluator.ts     # Expression AST walker
│   │   └── compiler.ts      # Compiler API
│   └── index.ts             # Public entry point
├── dist/
├── package.json
├── tsconfig.json
└── ...
```

## Development

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npm run test src/lexer/evaluator.test.ts
```

### Building

```bash
npm run build
```

## License

[MIT](LICENSE)
