import { LOG_10_ARNUM_BASE } from '../static/constants'
import { arnum } from '../static/ducks'

function getArnum(str: string): arnum {
  let arr = []
  while (str.length > LOG_10_ARNUM_BASE) {
    const chunk = str.substring(str.length - LOG_10_ARNUM_BASE)
    arr.push(chunk)
    str = str.substring(0, str.length - LOG_10_ARNUM_BASE)
  }
  arr.push(str)
  arr = arr.map((digit) => parseInt(digit))
  while (arr[arr.length - 1] === 0) arr.pop()
  return arr
}

export default getArnum
