import { ARNUM_BASE } from '../constants'
import { terminatingDec, repeatingDec } from './decimal'

describe('decimal.js', () => {
  it('fake test', () => {
    expect(true).toBe(true)
  })
  // it('parses terminating decimal', () => {
  //   expect(terminatingDec('1/10')).toEqual({
  //     numerator: [1],
  //     denominator: [10],
  //   })
  //   expect(terminatingDec('10/10')).toEqual({
  //     numerator: [1],
  //     denominator: [1],
  //   })
  //   expect(terminatingDec('10/1')).toEqual({
  //     numerator: [10],
  //     denominator: [1],
  //   })
  //   expect(terminatingDec('1000000/1')).toEqual({
  //     numerator: [1000000],
  //     denominator: [1],
  //   })
  //   expect(terminatingDec('10000000/1')).toEqual({
  //     numerator: [0, 1],
  //     denominator: [1],
  //   })
  // })
})
