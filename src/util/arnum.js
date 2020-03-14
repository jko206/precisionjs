import { MAX_ARNUM_DIGIT } from '~/src/constants';

export default function (str) {
  const maxLength = `${MAX_ARNUM_DIGIT}`.length - 1;
  const arr = [];
  while (str.length > maxLength) {
    const chunk = str.substring(str.length - maxLength)
    arr.push(chunk);
    str = str.substring(0, str.length - maxLength);
  }
  arr.push(str);
  return arr.map(digit => parseInt(digit));
}