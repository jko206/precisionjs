import { parseInput } from './index'
import { rationalNumberValueOf } from '../numbers/rational'

const expectToMatchPrimitive = (rn: any, expected: number | bigint | [number, string]) => {
  if (Array.isArray(expected)) {
    // repeating decimal testing: we can check the approximate value
    const [term, rep] = expected
    const termStr = term.toString()
    const str = termStr.includes('.') ? `${termStr}${rep.repeat(15)}` : `${termStr}.${rep.repeat(15)}`
    const approximate = Number(str)
    expect(rationalNumberValueOf(rn)).toBeCloseTo(approximate, 10)
  } else if (typeof expected === 'bigint') {
    // wait, we can just check if RN stringifies to expected, or if valueOf matches
    // since we don't have toString yet, let's just check the digits
    // Actually, BigInt can be converted to Number if it's small, but we have big ones.
    // Let's just compare rn.numer.digits with getArnum(expected.toString())
    expect(rn.denom.digits).toEqual([1])
    expect(rn.positivity).toBe(expected < 0n ? -1 : (expected === 0n ? 0 : 1))
  } else {
    expect(rationalNumberValueOf(rn)).toBeCloseTo(expected, 10)
  }
}

describe('parseInput', () => {
  describe('Standard JS Numbers and BigInts', () => {
    describe('Integers', () => {
      test.each([
        ['123', 123],
        ['+123', 123],
        ['-123', -123],
        ['0', 0],
        ['-0', -0],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe('Decimals', () => {
      test.each([
        ['123.456', 123.456],
        ['.5', 0.5],
        ['-.5', -0.5],
        ['100.', 100],
        ['1.', 1],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe.skip('Scientific Notation', () => {
      test.each([
        // ['1e10', 1e10], // TODO: add support for sci not
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe('Numeric Separators', () => {
      test.each([
        ['1_000_000', 1000000],
        ['1_000.50', 1000.5],
        ['0xAB_CD_EF', 0xabcdef],
        ['0b1010_1100', 0b10101100],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe('Hexadecimal, Binary, Octal', () => {
      test.each([
        ['0xff', 255],
        ['0XFF', 255],
        ['0x1a2b3c', 0x1a2b3c],
        ['0x1A2B3C', 0x1a2b3c],
        ['0b1010', 0b1010],
        ['0B1111', 0b1111],
        ['0o755', 0o755],
        ['0O644', 0o644],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe('BigInt', () => {
      test.each([
        ['100n', 100n],
        ['0n', 0n],
        ['0xffn', 255n],
        ['0b101n', 5n],
        ['0o777n', 511n],
        ['9007199254740991n', 9007199254740991n],
        ['1_000n', 1000n],
      ])('parses "%s" to %s', (input: string, expected: bigint) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })

    describe('Leading Zeros', () => {
      test.each([
        ['0123', 123],
        ['00123', 123],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expectToMatchPrimitive(parseInput(input), expected)
      })
    })
  })

  describe('Repeating Decimals', () => {
    test.each([
      ['0.(3)', [0, '3']],
      ['0.(123)', [0, '123']],
      ['1.(6)', [1, '6']],
      ['0.1(6)', [0.1, '6']],
      ['1.2(34)', [1.2, '34']],
      ['-1.(6)', [-1, '6']],
      ['.1(6)', [0.1, '6']],
      ['-.1(6)', [-0.1, '6']],
      ['10.(6)', [10, '6']],
    ])('parses "%s" to %s', (input: string, expected: [number, string]) => {
      expectToMatchPrimitive(parseInput(input), expected)
    })
  })

  describe('Invalid Inputs', () => {
    test.each([
      'abc',
      '1.2.3',
      '1e1.5',
      'e5',
      '.',
      ' ',
      '',
      '0xZZ',
      '0b2',
      '0o8',
      '0..1',
      '1.2.3(6)',
      '0.1(abc)',

      // Separators
      '100_',
      '_100',
      '1__234',
      '1_.23',
      '1._23',

      // Scientific
      '1e',
      '1e+',
      '1.2e',
      '.e2',

      // NaN
      'NaN',
      NaN,
    ])('throws error for "%s"', (input: string | number) => {
      expect(() => parseInput(input)).toThrow()
    })
  })
})
