export const stripZeros = (str: string) => {
  str = str.replace(/^0+/, '')
  if (str.includes('.')) str = str.replace(/0+$/, '')
  if (str.indexOf('.') === str.length - 1) str = str.replace('.', '')

  return str || '0'
}

// TODO: be able to handle -(-(----1)) and such
export const processNegativeNumber = (num: string) => {
  let isNegative = false
  while (num[0] === '-') {
    isNegative = !isNegative
    num = num.substr(1)
  }
  return { isNegative, num }
}
