// arnum
// returns 1 if a > b, 0 if a == b, and -1 if a < b
export const compareArnum = (a, b) => {
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
