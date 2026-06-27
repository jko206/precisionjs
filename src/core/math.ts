import { PrecisionNode, RationalNode } from './types';

export const gcd = (a: bigint, b: bigint): bigint => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

export const simplify = (node: RationalNode): RationalNode => {
  let { n, d, e } = node;
  if (n === 0n) {
    return { type: 'rational', n: 0n, d: 1n, e: 0n };
  }
  
  if (d < 0n) {
    n = -n;
    d = -d;
  }

  let divisor = gcd(n, d);
  if (divisor > 1n) {
    n /= divisor;
    d /= divisor;
  }

  // Optimize base 10 exponents (trailing zeros in n)
  while (n !== 0n && n % 10n === 0n) {
    n /= 10n;
    e += 1n;
  }
  
  // Remove 2s from denominator
  while (d !== 0n && d % 2n === 0n) {
    d /= 2n;
    n *= 5n;
    e -= 1n;
  }
  
  // Remove 5s from denominator
  while (d !== 0n && d % 5n === 0n) {
    d /= 5n;
    n *= 2n;
    e -= 1n;
  }

  // After multiplying n by 5 or 2, we might have created new trailing zeros in n
  while (n !== 0n && n % 10n === 0n) {
    n /= 10n;
    e += 1n;
  }

  return { type: 'rational', n, d, e };
};

const assertRational = (node: PrecisionNode): RationalNode => {
  if (node.type !== 'rational') {
    throw new Error('Unsupported operation on non-rational node');
  }
  return node;
};

export const mul = (a: PrecisionNode, b: PrecisionNode): PrecisionNode => {
  const ra = assertRational(a);
  const rb = assertRational(b);

  return simplify({
    type: 'rational',
    n: ra.n * rb.n,
    d: ra.d * rb.d,
    e: ra.e + rb.e,
  });
};

export const div = (a: PrecisionNode, b: PrecisionNode): PrecisionNode => {
  const ra = assertRational(a);
  const rb = assertRational(b);

  if (rb.n === 0n) {
    throw new Error('Division by zero');
  }

  return simplify({
    type: 'rational',
    n: ra.n * rb.d,
    d: ra.d * rb.n,
    e: ra.e - rb.e,
  });
};

export const add = (a: PrecisionNode, b: PrecisionNode): PrecisionNode => {
  const ra = assertRational(a);
  const rb = assertRational(b);

  const e_min = ra.e < rb.e ? ra.e : rb.e;
  
  const ra_e_diff = ra.e - e_min;
  const rb_e_diff = rb.e - e_min;

  const ra_n = ra.n * (10n ** ra_e_diff);
  const rb_n = rb.n * (10n ** rb_e_diff);

  const n1 = ra_n * rb.d;
  const n2 = rb_n * ra.d;

  return simplify({
    type: 'rational',
    n: n1 + n2,
    d: ra.d * rb.d,
    e: e_min,
  });
};

export const sub = (a: PrecisionNode, b: PrecisionNode): PrecisionNode => {
  const ra = assertRational(a);
  const rb = assertRational(b);

  const e_min = ra.e < rb.e ? ra.e : rb.e;
  
  const ra_e_diff = ra.e - e_min;
  const rb_e_diff = rb.e - e_min;

  const ra_n = ra.n * (10n ** ra_e_diff);
  const rb_n = rb.n * (10n ** rb_e_diff);

  const n1 = ra_n * rb.d;
  const n2 = rb_n * ra.d;

  return simplify({
    type: 'rational',
    n: n1 - n2,
    d: ra.d * rb.d,
    e: e_min,
  });
};
