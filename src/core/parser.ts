import { PrecisionNode } from './types';
import { frac } from './frac';
import { simplify } from './math';

const STRICT_NUMBER_REGEX = /^(-?)(\d+)(?:\.(\d*))?(?:\((\d+)\))?(?:[eE]([+-]?\d+))?$/;
const STRICT_INTEGER_REGEX = /^-?\d+$/;

export const parse = (input: string | number | bigint): PrecisionNode => {
  if (typeof input === 'number') {
    if (!Number.isFinite(input)) throw new Error('Invalid input: Number must be finite');
    input = input.toString();
  }
  
  if (typeof input === 'bigint') {
    return simplify({ type: 'rational', n: input, d: 1n, e: 0n });
  }

  const str = input.trim();

  // Check for strict fraction format first
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length !== 2) throw new Error('Invalid format: Only one / allowed in strict fraction');
    
    const [numStr, denStr] = parts;
    if (!STRICT_INTEGER_REGEX.test(numStr) || !STRICT_INTEGER_REGEX.test(denStr)) {
      throw new Error('Invalid format: Fractions must contain strict integers only');
    }
    
    return frac(numStr, denStr);
  }

  // Check for mixed fraction space (forbidden)
  if (str.includes(' ')) {
    throw new Error('Invalid format: Mixed fractions with spaces are not allowed');
  }
  
  // Check for arithmetic operators (forbidden)
  if (/[\+\-\*\^]/.test(str.replace(/^[+-]/, '').replace(/[eE][+-]/, ''))) {
    throw new Error('Invalid format: Inline arithmetic is not allowed');
  }

  const match = str.match(STRICT_NUMBER_REGEX);
  if (!match) {
    throw new Error(`Invalid format: Cannot parse "${str}"`);
  }

  const [, sign, whole, decimalPart, repeatingPart, exponentPart] = match;
  
  const isNegative = sign === '-';
  const dec = decimalPart || '';
  const eStr = exponentPart || '0';
  const eBase = BigInt(eStr);

  if (repeatingPart) {
    // Handling repeating decimals
    const L_t = BigInt(dec.length);
    const L_r = BigInt(repeatingPart.length);
    
    const V_t = BigInt(whole + dec);
    const R = BigInt(repeatingPart);
    
    // (10^L_r - 1)
    const repNines = (10n ** L_r) - 1n;
    
    // Numerator = V_t * (10^L_r - 1) + R
    let n = V_t * repNines + R;
    if (isNegative) n = -n;
    
    // Denominator = (10^L_r - 1) * 10^L_t
    const d = repNines * (10n ** L_t);
    
    return simplify({ type: 'rational', n, d, e: eBase });
  } else {
    // Terminating decimal or integer
    const V_t = BigInt(whole + dec);
    const L_t = BigInt(dec.length);
    
    let n = isNegative ? -V_t : V_t;
    // e = eBase - L_t
    const e = eBase - L_t;
    
    return simplify({ type: 'rational', n, d: 1n, e });
  }
};
