import { addArnums } from './add'

describe('add.js', () => {
  it('adds arnums', () => {
    expect(addArnums(
      [3, 2, 1],
      [6, 5, 4]
    )).toEqual([9, 7, 5])
  })
})