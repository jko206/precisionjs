import { compareArnum } from './comparator'
import { ARNUM_BASE } from '../constants/index'

type arnum = number[]

// PRE: minuend >= subtrahend
export const subtractArnums = (minuend: arnum, subtrahend: arnum): arnum => {
  const comparison = compareArnum(minuend, subtrahend)
  if (comparison === 0) return [0]
  if (comparison === -1) throw new Error(`Minuend must be greater than or equal to subtrahend`)
  const diff = []
  let place = 0
  let carryToLastDigit = false
  while (minuend[place] !== undefined) {
    if (carryToLastDigit) {
      diff[place - 1] += ARNUM_BASE
    }
    const minuendDigit: number = minuend[place] + (carryToLastDigit ? -1 : 0)
    const subtrahendDigit: number = subtrahend[place] || 0
    const differenceDigit = minuendDigit - subtrahendDigit
    carryToLastDigit = differenceDigit < 0
    diff[place] = differenceDigit

    place++
  }

  while (diff[diff.length - 1] === 0) {
    diff.pop()
  }

  return diff.length ? diff : [0]
}
