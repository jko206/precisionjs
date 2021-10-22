import RationalNumber from '../numbers/rational'
import isZero from '../definitions/zero'
import { isRepeatingDec, isTerminatingDec } from '../definitions/decimal'
import { terminatingDec, repeatingDec } from './decimal'
import add from '../functions/add'
import isSciNot from '../definitions/sci-not'
import isNatural from '../definitions/natural'
import getArnum from '../numbers/arnum'
import { processNegativeNumber } from '../util/misc'

const parser = (input: number | string): RationalNumber => {
  const processed = processNegativeNumber(`${input}`)
  const { isNegative, num } = processed
  if (isZero(num)) {
    return new RationalNumber([0], [1])
  }

  if (isSciNot(num)) {
    return new RationalNumber([1], [1], isNegative) // TODO: multiply by scinot part
  }

  if (isRepeatingDec(num)) {
    const { repDecArnum, termDecArnum } = repeatingDec(num)
    const { numerator: repDecNumer, denominator: repDecDenom } = repDecArnum
    const { numerator: termDecNumer, denominator: termDecDenom } = termDecArnum

    const rn = add(
      new RationalNumber(repDecNumer, repDecDenom),
      new RationalNumber(termDecNumer, termDecDenom),
    ) as RationalNumber
    rn.positivity = isNegative ? -1 : 1

    return rn
  } else if (isTerminatingDec(num)) {
    const { numerator, denominator } = terminatingDec(num)

    return new RationalNumber(numerator, denominator, isNegative)
  } else if (isNatural(num)) {
    return new RationalNumber(getArnum(num), [1], isNegative)
  } else {
    throw new Error(`Invalid argument: ${num}`)
  }
}

export default parser
