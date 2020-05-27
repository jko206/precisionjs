import { compareArnum } from './comparator'

const arnums = [[1000], [2000], [1, 1], [1, 1, 1], [1000000]]

describe('comparator.js', () => {
  it('compares two given arnums', () => {
    expect(compareArnum(arnums[0], arnums[0])).toBe(0)

    expect(compareArnum(arnums[0], arnums[1])).toBe(-1)

    expect(compareArnum(arnums[1], arnums[0])).toBe(1)

    expect(compareArnum(arnums[2], arnums[1])).toBe(1)

    expect(compareArnum(arnums[1], arnums[2])).toBe(-1)

    expect(compareArnum(arnums[2], arnums[3])).toBe(-1)

    expect(compareArnum(arnums[2], arnums[4])).toBe(1)

    expect(compareArnum(arnums[3], arnums[3])).toBe(0)
  })
})
