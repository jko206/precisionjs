import { PrecisionNode, RationalNode } from './types';
import { parse } from './parser';
import { simplify, gcd } from './math';

export enum RoundingMode {
  RoundHalfUp = 0,
  Truncate = 1,
  Ceil = 2,
  Floor = 3
}

export interface FractionFormatOptions {
  mixed?: boolean;
  denominator?: number;
}

export class Precision {
  public readonly node: PrecisionNode;

  constructor(input: PrecisionNode | string | number | bigint) {
    if (typeof input === 'object' && input !== null && 'type' in input) {
      this.node = input;
    } else {
      this.node = parse(input);
    }
  }

  toJSON(): PrecisionNode {
    return this.node;
  }

  toString(): string {
    if (this.node.type !== 'rational') {
      throw new Error('toString is currently only supported for RationalNode');
    }

    let { n: num, d: den, e } = this.node;

    if (e > 0n) {
      num *= 10n ** e;
    } else if (e < 0n) {
      den *= 10n ** -e;
    }

    const isNegative = num < 0n;
    const absNum = isNegative ? -num : num;
    const sign = isNegative ? "-" : "";

    const intPart = absNum / den;
    let rem = absNum % den;

    if (rem === 0n) return sign + intPart.toString();

    let decimalStr = "";
    const rems = new Map<bigint, number>();
    let i = 0;

    while (rem !== 0n) {
      if (rems.has(rem)) {
        const start = rems.get(rem)!;
        return `${sign}${intPart}.${decimalStr.slice(0, start)}(${decimalStr.slice(start)})`;
      }
      rems.set(rem, i);
      rem *= 10n;
      decimalStr += (rem / den).toString();
      rem %= den;
      i++;
    }

    return `${sign}${intPart}.${decimalStr}`;
  }

  toFixed(places: number, mode: RoundingMode = RoundingMode.RoundHalfUp): string {
    if (this.node.type !== 'rational') {
      throw new Error('toFixed is currently only supported for RationalNode');
    }
    
    if (places < 0 || !Number.isInteger(places)) {
      throw new Error('places must be a non-negative integer');
    }

    let { n: num, d: den, e } = this.node;
    e += BigInt(places);

    if (e > 0n) {
      num *= 10n ** e;
    } else if (e < 0n) {
      den *= 10n ** -e;
    }

    const isNegative = num < 0n;
    const absNum = isNegative ? -num : num;
    const sign = isNegative ? "-" : "";

    let absQ = absNum / den;
    const rem = absNum % den;

    if (rem !== 0n) {
      switch (mode) {
        case RoundingMode.RoundHalfUp:
          if (rem * 2n >= den) absQ += 1n;
          break;
        case RoundingMode.Ceil:
          if (!isNegative) absQ += 1n;
          break;
        case RoundingMode.Floor:
          if (isNegative) absQ += 1n;
          break;
        case RoundingMode.Truncate:
          break;
      }
    }

    let strQ = absQ.toString();
    if (places > 0) {
      strQ = strQ.padStart(places + 1, '0');
      strQ = strQ.slice(0, -places) + '.' + strQ.slice(-places);
    }
    
    // Handle case where we might have "-0" or "-0.00" if truncated, but math is math
    if (isNegative && absQ === 0n) {
      // In Javascript, we often don't want "-0" unless strictly needed, but let's keep the sign for precision loss indication unless zero.
      // If RoundHalfUp brings it to 0, it's just 0.
      if (mode !== RoundingMode.Truncate && mode !== RoundingMode.Floor) {
        // usually we don't output -0
        return `0` + (places > 0 ? '.' + '0'.repeat(places) : '');
      }
    }

    // if completely 0 and not negative sign required
    if (absQ === 0n && !isNegative) {
      strQ = '0' + (places > 0 ? '.' + '0'.repeat(places) : '');
      return strQ;
    }

    return sign + strQ;
  }

  toFraction(options?: FractionFormatOptions): string {
    if (this.node.type !== 'rational') {
      throw new Error('toFraction is currently only supported for RationalNode');
    }

    let { n: num, d: den, e } = this.node;

    if (e > 0n) {
      num *= 10n ** e;
    } else if (e < 0n) {
      den *= 10n ** -e;
    }

    const divisor = gcd(num, den);
    if (divisor > 1n) {
      num /= divisor;
      den /= divisor;
    }

    if (options?.denominator) {
      const targetDen = BigInt(options.denominator);
      const scaledNum = num * targetDen;
      
      const isNegative = scaledNum < 0n;
      const absScaledNum = isNegative ? -scaledNum : scaledNum;
      
      let q = absScaledNum / den;
      const rem = absScaledNum % den;
      
      if (rem * 2n >= den) {
        q += 1n;
      }
      
      num = isNegative ? -q : q;
      den = targetDen;
    }

    const isNegative = num < 0n;
    const absNum = isNegative ? -num : num;
    const sign = isNegative ? "-" : "";

    if (options?.mixed) {
      const w = absNum / den;
      const rem = absNum % den;
      if (rem === 0n) return sign + w.toString();
      if (w === 0n) return `${sign}${rem}/${den}`;
      return `${sign}${w} ${rem}/${den}`;
    }

    // In non-mixed mode, if denom is 1 we still usually return integer string, but let's see. 
    // Wait, scribbles says "measurement.toFraction(); // Returns '11/4'". 
    // If it's an integer, "toFraction" should probably return "X/1" or just "X"? 
    // frac(5) represents 5/1. Let's return just string if denom is 1.
    if (den === 1n) return sign + absNum.toString();

    return `${sign}${absNum}/${den}`;
  }
}

export const prec = (input: string | number | bigint) => new Precision(input);
