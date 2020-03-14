import getArnum from './arnum'
import {MAX_ARNUM_DIGIT} from '~/src/constants'
import arnum from './arnum'

// 3 => MAX_ARNUM_DIGIT**3
function getPowerOfArnumBase(exp) {
  const maxArnumZeroCount = `${MAX_ARNUM_DIGIT}`.length - 1
  const zeros = '0'.repeat(maxArnumZeroCount)
  
  return '1' + zeros.repeat(exp)
}

function getRandomArnumDigit() {
  let r = 0.01
  while(r < 0.1) r = Math.random() // so as to not get an arnumDigit that has a leading 0
  return Math.floor(r * MAX_ARNUM_DIGIT)
}

describe('arnum.js', () => {
  test('getArnum()', () => {
    expect(getArnum('1')).toEqual([1])
    expect(getArnum('1000000')).toEqual([1000000])
    
    expect(getArnum(`${MAX_ARNUM_DIGIT}`)).toEqual([0, 1])

    const pow2 = getPowerOfArnumBase(2)
    expect(getArnum(pow2)).toEqual([0, 0, 1])
    
    const pow3 = getPowerOfArnumBase(3)
    expect(getArnum(pow3)).toEqual([0, 0, 0, 1])

    const pow30 = getPowerOfArnumBase(30)
    const arnum30 = new Array(30).fill(0)
    arnum30.push(1) // [0 x 30, 1]
    expect(getArnum(pow30)).toEqual(arnum30)

    const pow300 = getPowerOfArnumBase(300)
    const arnum300 = new Array(300).fill(0)
    arnum300.push(1) // [0 x 300, 1]
    expect(getArnum(pow300)).toEqual(arnum300)

    const random = [getRandomArnumDigit(), getRandomArnumDigit(), getRandomArnumDigit()]
    const str = random.join('')
    expect(getArnum(str)).toEqual(random.reverse())
  })
})