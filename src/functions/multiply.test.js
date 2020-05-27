import multiplyArnums from './multiply'
import arnum from '../util/arnum.js'

describe('multiply.js', () => {
  it('multiply arnums', () => {
    expect(multiplyArnums([3, 2, 1], [1])).toEqual([3, 2, 1])

    expect(multiplyArnums([1], [3, 2, 1])).toEqual([3, 2, 1])

    expect(multiplyArnums([3, 2, 1], [0, 1])).toEqual([0, 3, 2, 1])

    expect(multiplyArnums([0, 1], [3, 2, 1])).toEqual([0, 3, 2, 1])

    expect(multiplyArnums([3, 2, 1], [0, 2])).toEqual([0, 6, 4, 2])

    expect(multiplyArnums([0, 2], [3, 2, 1])).toEqual([0, 6, 4, 2])

    expect(multiplyArnums([3, 2, 1], [2, 2])).toEqual(arnum('2000000600000100000006'))

    expect(multiplyArnums(arnum('30670611727837901192'), arnum('81126840202085220867'))).toEqual(
      arnum('2488209816544506301085316034759042573464'),
    )

    expect(
      multiplyArnums(
        arnum('605881025935900057632270154397334802003'),
        arnum('5534011216879981365928981304952000318'),
        arnum('5667248510129402406278002221897072087915'),
        arnum('2866181414294083680568129177973394313695'),
      ),
    ).toEqual(
      arnum(
        `
      544632206716623191473040301766600788533239909190
      192125019233311497202293670292028914059190056058
      662810760562701308149160355411634875474764384418
      55213412450
    `.replace(/\s/g, ''),
      ),
    )
  })
})
