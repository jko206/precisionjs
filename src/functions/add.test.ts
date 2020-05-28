import { addArnums } from './add'
import arnum from '../util/arnum'
import { checkIoMatch } from '../util/test-util'

const a = arnum('375801024789183707523620150398520054526152638173950')
const b = arnum('93508461094916940576949955528076561541008302772795')
const sum = arnum('469309485884100648100570105926596616067160940946745')
const cases = [
  {
    input: [
      [3, 2, 1],
      [6, 5, 4],
    ],
    expected: [9, 7, 5],
  },
  {
    input: [
      [3000000, 2, 1],
      [6000000, 5, 4],
    ],
    expected: [9000000, 7, 5],
  },
  { input: [[1], [9999999]], expected: [0, 1] },
  { input: [[4000000], [6000000]], expected: [0, 1] },
  {
    input: [
      [4000000, 2, 1],
      [6000000, 5, 4],
    ],
    expected: [0, 8, 5],
  },
  { input: [[1], [9999999, 9999999, 9999999]], expected: [0, 0, 0, 1] },
  {
    input: [
      [0, 1],
      [0, 9999999, 9999999, 9999999],
    ],
    expected: [0, 0, 0, 0, 1],
  },
  { input: [a, b], expected: sum },
]

checkIoMatch('add.ts', [cases], [{ description: 'addArnums', fn: addArnums }])
