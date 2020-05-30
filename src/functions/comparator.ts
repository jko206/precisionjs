import { arnum } from '../ducks'

// a > b => 1
// a === b => 0
// a < b => -1
export const compareArnum = (a: arnum, b: arnum): -1 | 0 | 1 => {
  if (!a.length) return compareArnum([0], b)
  if (!b.length) return compareArnum(a, [0])
  if (a.length !== b.length) {
    return a.length > b.length ? 1 : -1
  }
  let lastIndex = a.length - 1
  while (lastIndex >= 0) {
    if (a[lastIndex] !== b[lastIndex]) {
      return a[lastIndex] > b[lastIndex] ? 1 : -1
    }
    lastIndex--
  }
  return 0
}
