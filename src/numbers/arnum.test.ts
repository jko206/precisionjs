import getArnum from './arnum'
import { checkIoMatch } from '../util/test-util'
import { ARNUM_BASE } from '../constants/index'

// 3 => ARNUM_BASE**3
function getPowerOfArnumBase(exp: number) {
  const maxArnumZeroCount = `${ARNUM_BASE}`.length - 1
  const zeros = '0'.repeat(maxArnumZeroCount)

  return '1' + zeros.repeat(exp)
}

function getRandomArnumDigit() {
  let r = 0.01
  while (r < 0.1) r = Math.random() // so as to not get an arnumDigit that has a leading 0
  return Math.floor(r * ARNUM_BASE)
}
const pow2 = getPowerOfArnumBase(2)
const pow3 = getPowerOfArnumBase(3)
const pow30 = getPowerOfArnumBase(30)
const arnum30 = new Array(30).fill(0)
arnum30.push(1) // [0 x 30, 1]
const pow300 = getPowerOfArnumBase(300)
const arnum300 = new Array(300).fill(0)
arnum300.push(1) // [0 x 300, 1]
const random = [getRandomArnumDigit(), getRandomArnumDigit(), getRandomArnumDigit()]
const str = random.join('')

const testCases = [
  { input: ['1'], expected: [1] },
  { input: ['1000000'], expected: [1000000] },
  { input: [`123456789012345678901`], expected: [5678901, 8901234, 1234567] },
  { input: [`100000020000003`], expected: [3, 2, 1] },
  { input: [`${ARNUM_BASE}`], expected: [0, 1] },
  { input: [pow2], expected: [0, 0, 1] },
  { input: [pow3], expected: [0, 0, 0, 1] },
  { input: [pow30], expected: arnum30 },
  { input: [pow300], expected: arnum300 },
  { input: [str], expected: random.reverse() },
]

checkIoMatch('arnum.ts', [testCases], [{ description: 'getArnum', fn: getArnum }])
