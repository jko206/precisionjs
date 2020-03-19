import { MAX_ARNUM_DIGIT } from '../constants'
import { terminatingDec, repeatingDec } from './decimal'

describe('decimal.js', () => {
  it('parses terminating decimal', () => {
    expect(terminatingDec('0.1')).toEqual({
      numerator: [1],
      denominator: [10],
    })
    expect(terminatingDec('1.1')).toEqual({
      numerator: [11],
      denominator: [10],
    })
    expect(terminatingDec('0.1')).toEqual({
      numerator: [1],
      denominator: [10],
    })

    expect(terminatingDec('0.001')).toEqual({
      numerator: [1],
      denominator: [1000],
    })

    expect(terminatingDec('0.0000001')).toEqual({
      numerator: [1],
      denominator: [0, 1],
    })

    expect(terminatingDec('0.1234567')).toEqual({
      numerator: [1234567],
      denominator: [0, 1],
    })

    expect(terminatingDec('0.00000001234567')).toEqual({
      numerator: [1234567],
      denominator: [0, 0, 1],
    })

    expect(terminatingDec('0.12345670999999')).toEqual({
      numerator: [999999, 1234567],
      denominator: [0, 0, 1],
    })

    expect(terminatingDec('1234567.0999999')).toEqual({
      numerator: [999999, 1234567],
      denominator: [0, 1],
    })
  })

  it('parses repeating decimal', () => {
    let result = repeatingDec('0.1...1')
    expect(result).toEqual({
      repDecArnum: {
        numerator: [1],
        denominator: [90],
      },
      termDecArnum: {
        numerator: [1],
        denominator: [10],
      },
    })

    result = repeatingDec('0.1...1234')
    expect(result).toEqual({
      repDecArnum: {
        numerator: [1234],
        denominator: [99990],
      },
      termDecArnum: {
        numerator: [1],
        denominator: [10],
      },
    })

    result = repeatingDec('0.1234...1234')
    expect(result).toEqual({
      repDecArnum: {
        numerator: [1234],
        denominator: [9990000, 9],
      },
      termDecArnum: {
        numerator: [1234],
        denominator: [10000],
      },
    })
  })
})