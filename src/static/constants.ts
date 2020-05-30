/**
 *  ARNUM_BASE is the highest power of 10 that is less than the square root of Number.MAX_SAFE_INTEGER.
 */
export const ARNUM_BASE = 10000000 // 10,000,000

export const LOG_10_ARNUM_BASE = Math.log10(ARNUM_BASE) // 7

export const ZERO = {
  numerator: [0],
  denominator: [1],
}
