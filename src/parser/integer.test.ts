import parseInteger from './integer'
import { ARNUM_BASE } from '../constants'

describe('integer.js', () => {
  it('parses integer to realNum', () => {
    expect(parseInteger('1')).toEqual({
      numerator: [1],
      denominator: [1],
    })

    expect(parseInteger('123456')).toEqual({
      numerator: [123456],
      denominator: [1],
    })

    const zeros = `${ARNUM_BASE}`.substring(1)
    const random = Math.floor(Math.random() * 10000)

    expect(parseInteger(`${random}${zeros}`)).toEqual({
      numerator: [0, random],
      denominator: [1],
    })
  })
})
