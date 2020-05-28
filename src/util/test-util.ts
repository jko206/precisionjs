import { isArray } from 'util'

type testCase = { input: any; expected: any }

type fn = (...arg: any[]) => any

export const checkIoMatch = (
  fileName: string,
  testCaseSets: testCase[][],
  functions: { description: string; fn: fn }[],
) => {
  if (testCaseSets.length !== functions.length)
    throw new Error(`Number of test case sets doesn't match the number of function`)

  describe(`${fileName}`, () => {
    testCaseSets.forEach((testCases, i) => {
      const { description, fn } = functions[i]

      describe(`${description}`, () => {
        testCases.forEach(({ input, expected }, j) => {
          if (!isArray(input)) input = [input]
          const output = fn(...input)

          test(`Test case #${j + 1}: ${input} => ${expected}`, () => {
            expect(output).toEqual(expected)
          })
        })
      })
    })
  })
}
