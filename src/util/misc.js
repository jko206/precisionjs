export const stripZeros = (str) => {
  str = str.replace(/^0+/, '')
  if (str.includes('.')) str = str.replace(/0+$/, '')
  if (str.indexOf('.') === str.length - 1) str = str.replace('.', '')

  return str || '0'
}
