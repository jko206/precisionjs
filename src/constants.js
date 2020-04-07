/**
 *  MAX_ARNUM_DIGIT is the highest power of 10 that is less than the square root of Number.MAX_SAFE_INTEGER.
 *  This way, even when 
 */

// TODO: Replace MAX_ARNUM_DIGIT with ARNUM_BASE everywhere
export const MAX_ARNUM_DIGIT = 10000000 // 10,000,000

export const LOG_10_ARNUM_BASE = Math.log10(MAX_ARNUM_DIGIT)

export const ZERO = {
  numerator: [0],
  denominator: [1],
}