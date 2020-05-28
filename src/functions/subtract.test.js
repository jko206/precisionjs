import { subtractArnums } from './subtract'
import { ARNUM_BASE } from '../constants'

describe('subtractArnums', () => {
  test('subtracts arnums', () => {
    let result = subtractArnums([5], [1])
    expect(result).toEqual([4])

    result = subtractArnums([1000], [900])
    expect(result).toEqual([100])

    result = subtractArnums([20], [0])
    expect(result).toEqual([20])

    result = subtractArnums([20], [])
    expect(result).toEqual([20])

    result = subtractArnums([0, 1], [1])
    expect(result).toEqual([ARNUM_BASE - 1])

    result = subtractArnums([0, 0, 0, 1], [1])
    expect(result).toEqual([ARNUM_BASE - 1, ARNUM_BASE - 1, ARNUM_BASE - 1])

    result = subtractArnums([1], [1])
    expect(result).toEqual([0])

    result = subtractArnums([0, 0, 0, 1], [0, 0, 0, 1])
    expect(result).toEqual([0])

    result = subtractArnums([1, 1, 1, 1], [1, 1, 1, 1])
    expect(result).toEqual([0])
  })
})
