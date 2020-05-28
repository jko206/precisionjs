import getArnum from '../util/arnum'

export default (n: string) => ({
  numerator: getArnum(n),
  denominator: getArnum('1'),
})
