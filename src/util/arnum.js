import { MAX_ARNUM_DIGIT } from '~/src/constants';

export default function (str) {
  const maxLength = `${MAX_ARNUM_DIGIT}`.length - 1;
  let arr = [];
  while (str.length > maxLength) {
    const chunk = str.substring(str.length - maxLength)
    arr.push(chunk);
    str = str.substring(0, str.length - maxLength);
  }
  arr.push(str);
  arr = arr.map(digit => parseInt(digit));
  while(arr[arr.length - 1] === 0) arr.pop()
  return arr
}