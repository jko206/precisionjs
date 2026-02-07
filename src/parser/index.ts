import RationalNumber from '../numbers/rational'
import isZero from '../definitions/zero'
import { isRepeatingDec, isTerminatingDec } from '../definitions/decimal'
import { terminatingDec, repeatingDec } from './decimal'
import add from '../functions/add'
import isSciNot from '../definitions/sci-not'
import isNatural from '../definitions/natural'
import getArnum from '../numbers/arnum'
import { processNegativeNumber } from '../util/misc'

export const parser = (input: number | string): RationalNumber => {
  const processed = processNegativeNumber(`${input}`)
  const { isNegative, num } = processed
  if (isZero(num)) {
    return new RationalNumber([0], [1])
  }

  if (isSciNot(num)) {
    return new RationalNumber([1], [1], isNegative) // TODO: multiply by scinot part
  }

  if (isRepeatingDec(num)) {
    const { repDecArnum, termDecArnum } = repeatingDec(num)
    const { numerator: repDecNumer, denominator: repDecDenom } = repDecArnum
    const { numerator: termDecNumer, denominator: termDecDenom } = termDecArnum

    const rn = add(
      new RationalNumber(repDecNumer, repDecDenom),
      new RationalNumber(termDecNumer, termDecDenom),
    ) as RationalNumber
    rn.positivity = isNegative ? -1 : 1

    return rn
  } else if (isTerminatingDec(num)) {
    const { numerator, denominator } = terminatingDec(num)

    return new RationalNumber(numerator, denominator, isNegative)
  } else if (isNatural(num)) {
    return new RationalNumber(getArnum(num), [1], isNegative)
  } else {
    throw new Error(`Invalid argument: ${num}`)
  }
}

// 1. Numeric Separator Rule: Underscore between digits only
const sep = '(?:_[0-9]+)*'
const hexSep = '(?:_[0-9a-fA-F]+)*'
const binSep = '(?:_[01]+)*'
const octSep = '(?:_[0-7]+)*'

// 2. Sub-patterns for different bases
const hex = `0[xX][0-9a-fA-F]+${hexSep}`
const bin = `0[bB][01]+${binSep}`
const oct = `0[oO][0-7]+${octSep}`

// 3. Decimal and Scientific Notation
// Matches: 123, 123.456, .456, 123.
const decimal = `(?:[0-9]+${sep}(?:\\.(?:[0-9]+${sep})?)?|\\.[0-9]+${sep})`
const exponent = `[eE][+-]?[0-9]+${sep}`

// 4. BigInt (Integers only)
const bigInt = `(?:${hex}|${bin}|${oct}|[0-9]+${sep})n`

// 5. Final Combined Regex
// Includes optional leading sign for practical parsing
// Wrap decimal and exponent in groups to ensure correct precedence
const pattern = new RegExp(
  `^[+-]?(?:${bigInt}|${hex}|${bin}|${oct}|(?:${decimal})(?:${exponent})?)$`,
)

/**
 * Validates strings against ES2026 numeric literal rules.
 * Returns true if the string is a valid JS number (integer, float, BigInt, hex, bin, oct).
 */
const isJSNumber = (str: string) => pattern.test(str)

/**
 * Parses input into a number, bigint, or a tuple of [number, string] for repeating decimals.
 * Returns null if parsing fails.
 * @param input
 * @returns
 */
export const parseInput = (
  input: string | number,
): number | bigint | [number | bigint, string] | null => {
  if (typeof input === 'number') {
    return Number.isNaN(input) ? null : input
  }

  const strInput = `${input}`

  if (strInput === 'NaN') return null
  if (strInput === 'Infinity' || strInput === '+Infinity') return Infinity
  if (strInput === '-Infinity') return -Infinity

  if (isJSNumber(strInput)) {
    // Handle BigInt
    if (strInput.endsWith('n')) {
      return BigInt(strInput.slice(0, -1).replace(/_/g, ''))
    }
    // Handle potentially valid numeric separators for Number
    return Number(strInput.replace(/_/g, ''))
  }

  // Check for repeating decimal pattern: nonRepeating(repeating)
  // Example: 0.1(6) -> nonRepeating: 0.1, repeating: 6
  // Regex: ^(.*)\((.*)\)$
  const match = strInput.match(/^(.*)\((.*)\)$/)
  if (match) {
    const [, nonRepeating, repeating] = match

    // Check validity using isJSNumber
    if (isJSNumber(nonRepeating) && isJSNumber(repeating)) {
      // Parse nonRepeating
      // We can recursively call parseInput or just handle it directly since we know it's valid.
      // However, isJSNumber handles separators, so we should clean it up
      const parsedNonRepeating = parseInput(nonRepeating)

      // Ensure parsedNonRepeating is a number or bigint (not another tuple or null)
      if (typeof parsedNonRepeating === 'number' || typeof parsedNonRepeating === 'bigint') {
        return [parsedNonRepeating, repeating]
      }
    }
  }

  return null
}
