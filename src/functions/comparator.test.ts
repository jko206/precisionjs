import { compareArnum } from './comparator'

describe('comparator.js', () => {
  it('compares two given arnums', () => {
    expect(compareArnum([1000], [1000])).toBe(0)

    expect(compareArnum([1000], [2000])).toBe(-1)

    expect(compareArnum([2000], [1000])).toBe(1)

    expect(compareArnum([1, 1], [2000])).toBe(1)

    expect(compareArnum([2000], [1, 1])).toBe(-1)

    expect(compareArnum([1, 1], [1, 1, 1])).toBe(-1)

    expect(compareArnum([1, 1], [1000000])).toBe(1)

    expect(compareArnum([1, 1, 1], [1, 1, 1])).toBe(0)

    expect(compareArnum([], [1, 1, 1])).toBe(-1)

    expect(compareArnum([1, 1, 1], [])).toBe(1)

    expect(compareArnum([], [])).toBe(0)
    expect(compareArnum([], [0])).toBe(0)
    expect(compareArnum([0], [])).toBe(0)
  })
})
