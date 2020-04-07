import { addArnums } from './add'
import arnum from '../util/arnum.js'

describe('add.js', () => {
  it('adds arnums', () => {
    expect(addArnums(
      [3, 2, 1],
      [6, 5, 4]
    )).toEqual([9, 7, 5])

    expect(addArnums(
      [3000000, 2, 1],
      [6000000, 5, 4]
    )).toEqual([9000000, 7, 5])

    expect(addArnums(
      [1],
      [9999999]
    )).toEqual([0, 1])

    expect(addArnums(
      [4000000],
      [6000000]
    )).toEqual([0, 1])

    expect(addArnums(
      [4000000, 2, 1],
      [6000000, 5, 4]
    )).toEqual([0, 8, 5])

    expect(addArnums(
      [1],
      [9999999, 9999999, 9999999]
    )).toEqual([0, 0, 0, 1])

    expect(addArnums(
      [0, 1],
      [0, 9999999, 9999999, 9999999]
    )).toEqual([0, 0, 0, 0, 1])

    const a = arnum('375801024789183707523620150398520054526152638173950')
    const b = arnum('93508461094916940576949955528076561541008302772795')
    const sum = arnum('469309485884100648100570105926596616067160940946745')
    expect(addArnums(a, b)).toEqual(sum)
  })

})