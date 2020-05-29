import { ARNUM_BASE } from '../constants/index'

export default function (str: string) {
  const maxLength = `${ARNUM_BASE}`.length - 1
  let arr = []
  while (str.length > maxLength) {
    const chunk = str.substring(str.length - maxLength)
    arr.push(chunk)
    str = str.substring(0, str.length - maxLength)
  }
  arr.push(str)
  arr = arr.map((digit) => parseInt(digit))
  while (arr[arr.length - 1] === 0) arr.pop()
  return arr
}
