import getArnum from '../numbers/natural/arnum'

export default (n: string) => ({
  numerator: getArnum(n),
  denominator: getArnum('1'),
})
