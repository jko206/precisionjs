import createRationalNumber from '../numbers/rational'
import { RationalNumber } from '../static/interfaces'
import isZero from '../definitions/zero'
import { isRepeatingDec, isTerminatingDec } from '../definitions/decimal'
import { terminatingDec, repeatingDec } from './decimal'
import add, { addRationalNumbers } from '../functions/add'
import isSciNot from '../definitions/sci-not'
import isNatural from '../definitions/natural'
import getArnum from '../numbers/arnum'
import { processNegativeNumber } from '../util/misc'

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
const decimal = `(?:[0-9]+${sep}(?:\\.(?:[0-9]+${sep})?)?|\\.[0-9]+${sep})`
const exponent = `[eE][+-]?[0-9]+${sep}`

// 4. BigInt (Integers only)
const bigInt = `(?:${hex}|${bin}|${oct}|[0-9]+${sep})n`

// 5. Final Combined Regex
const pattern = new RegExp(
  `^[+-]?(?:${bigInt}|${hex}|${bin}|${oct}|(?:${decimal})(?:${exponent})?)$`,
)

export const isJSNumber = (str: string) => pattern.test(str)

export const parser = (input: number | string): RationalNumber => {
  if (typeof input === 'number') {
    if (Number.isNaN(input) || !Number.isFinite(input)) {
      throw new Error(`Invalid argument: ${input}`)
    }
    input = input.toString()
  }

  const processed = processNegativeNumber(`${input}`)
  const { isNegative, num } = processed
  if (isZero(num)) {
    return createRationalNumber([0], [1])
  }

  if (isRepeatingDec(num)) {
    const { repDecArnum, termDecArnum } = repeatingDec(num)
    const { numerator: repDecNumer, denominator: repDecDenom } = repDecArnum
    const { numerator: termDecNumer, denominator: termDecDenom } = termDecArnum

    const rn = addRationalNumbers(
      createRationalNumber(repDecNumer, repDecDenom),
      createRationalNumber(termDecNumer, termDecDenom),
    )
    rn.positivity = isNegative ? -1 : 1

    return rn
  }

  if (!isJSNumber(num)) {
    throw new Error(`Invalid argument: ${num}`)
  }

  // Strip numeric separators
  const cleanNum = num.replace(/_/g, '')

  // Handle BigInt
  if (cleanNum.endsWith('n')) {
    const bigIntStr = cleanNum.slice(0, -1)
    const base10Str = bigIntStr.match(/^0[xXbBoO]/)
      ? BigInt(bigIntStr).toString()
      : bigIntStr
    return createRationalNumber(getArnum(base10Str), [1], isNegative)
  }

  // Handle Hex/Bin/Octal
  if (cleanNum.match(/^0[xXbBoO]/)) {
    const base10Str = BigInt(cleanNum).toString()
    return createRationalNumber(getArnum(base10Str), [1], isNegative)
  }

  // Handle Scientific Notation
  if (isSciNot(cleanNum)) {
    return createRationalNumber([1], [1], isNegative) // TODO: multiply by scinot part
  }

  // Handle Decimal
  if (cleanNum.includes('.')) {
    // Some valid JS decimals end with a dot, e.g. "100."
    const normalized = cleanNum.endsWith('.') ? cleanNum.slice(0, -1) : cleanNum
    if (!normalized.includes('.')) {
      return createRationalNumber(getArnum(normalized), [1], isNegative)
    }
    const { numerator, denominator } = terminatingDec(normalized)
    return createRationalNumber(numerator, denominator, isNegative)
  }

  // Natural number
  return createRationalNumber(getArnum(cleanNum), [1], isNegative)
}

export const parseInput = parser

