import { PrecisionNode } from './types';
import { simplify } from './math';

const parseInteger = (val: number | string | bigint, originalVal: any): bigint => {
  if (typeof val === 'number') {
    if (!Number.isInteger(val)) throw new Error(`Invalid argument: ${originalVal}. Arguments must be integers.`);
    return BigInt(val);
  }
  if (typeof val === 'string') {
    if (!/^-?\d+$/.test(val)) throw new Error(`Invalid argument: ${originalVal}. Arguments must be integers.`);
    return BigInt(val);
  }
  return val;
};

export const frac = (...args: (number | string | bigint)[]): PrecisionNode => {
  if (args.length === 1) {
    return simplify({ type: 'rational', n: parseInteger(args[0], args[0]), d: 1n, e: 0n });
  }
  
  if (args.length === 2) {
    const n = parseInteger(args[0], args[0]);
    const d = parseInteger(args[1], args[1]);
    if (d === 0n) throw new Error('Denominator cannot be zero');
    return simplify({ type: 'rational', n, d, e: 0n });
  }
  
  if (args.length === 3) {
    // Check for negative zero in whole number part
    const isNegativeWhole = 
      args[0] === '-0' || 
      (typeof args[0] === 'number' && Object.is(args[0], -0)) || 
      (typeof args[0] === 'string' && args[0].startsWith('-')) ||
      (typeof args[0] === 'number' && args[0] < 0) ||
      (typeof args[0] === 'bigint' && args[0] < 0n);

    let w = parseInteger(args[0], args[0]);
    let n = parseInteger(args[1], args[1]);
    const d = parseInteger(args[2], args[2]);

    if (d === 0n) throw new Error('Denominator cannot be zero');
    if (n < 0n || d < 0n) throw new Error('Numerator and denominator in mixed fraction must be positive');

    if (w < 0n) {
      w = -w;
    }

    const totalN = (w * d) + n;
    
    return simplify({ 
      type: 'rational', 
      n: isNegativeWhole ? -totalN : totalN, 
      d, 
      e: 0n 
    });
  }

  throw new Error('Invalid number of arguments for frac');
};
