import { parseInput } from './index'

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
        expect(parseInput(input)).toBe(expected)
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
        expect(parseInput(input)).toBe(expected)
      })
    })

    describe('Scientific Notation', () => {
      test.each([
        ['1e10', 1e10],
        ['1E10', 1e10],
        ['1e+10', 1e10],
        ['1.5e-10', 1.5e-10],
        ['-.5e2', -50],
        ['5.E-2', 0.05],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expect(parseInput(input)).toBe(expected)
      })
    })

    describe('Numeric Separators', () => {
      test.each([
        ['1_000_000', 1000000],
        ['1_000.50', 1000.5],
        ['0xAB_CD_EF', 0xabcdef],
        ['0b1010_1100', 0b10101100],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expect(parseInput(input)).toBe(expected)
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
        expect(parseInput(input)).toBe(expected)
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
        expect(parseInput(input)).toBe(expected)
      })
    })

    describe('Infinity', () => {
      test.each([
        ['Infinity', Infinity],
        ['-Infinity', -Infinity],
        [Infinity, Infinity],
        [-Infinity, -Infinity],
      ])('parses "%s" to %s', (input: string | number, expected: number) => {
        expect(parseInput(input)).toBe(expected)
      })
    })

    describe('Leading Zeros', () => {
      test.each([
        ['0123', 123],
        ['00123', 123],
      ])('parses "%s" to %s', (input: string, expected: number) => {
        expect(parseInput(input)).toBe(expected)
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
      ['0.1(6_6)', [0.1, '6_6']], // Separators in repeating part
    ])('parses "%s" to %s', (input: string, expected: [number, string]) => {
      expect(parseInput(input)).toEqual(expected)
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
      '1.2.3',
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
    ])('returns null for "%s"', (input: string | number) => {
      expect(parseInput(input)).toBeNull()
    })
  })
})
