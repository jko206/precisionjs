import { MAX_ARNUM_DIGIT } from '~/src/constants';
import { isPureInt, isSciNot, isStringInt, isSafeInt, isNeg } from '~/src/parser/tester';
/*
Is safe pure int
Is pure int
Is sci not -> make it into string int
Is safe string int
Is string int
*/
export function getArnumFromPureInt(n) {
  let arr = [];
  while (n >= MAX_ARNUM_DIGIT) {
    arr.push(n % MAX_ARNUM_DIGIT);
    n = Math.floor(n / MAX_ARNUM_DIGIT);
  }
  arr.push(n);
  return arr;
}

export function getArnumFromStringInt(str) {
  const maxLength = `${MAX_ARNUM_DIGIT}`.length;
  const arr = [];
  while (str.length >= maxLength) {
    arr.push(str.substring(0, maxLength - 1));
    str = str.substring(maxLength - 1);
  }
  arr.push(str);
  return arr.map(digit => parseInt(digit));
}

function trimZeroes(str) {
  return str.replace(/0+$/, '').replace(/^0+/, '');
}

/**
 * @param {string} input
 * @returns {string}
 */
export function getStringNumFromSciNot(input) {
  const splitExp = input.split('e');
  const splitNum = splitExp[0].split('.');
  let integer = splitNum[0];
  integer = integer.replace(/^0+/, '');
  let decimal = splitNum[1] || '';
  decimal = decimal.replace(/0+$/, '');
  const exponent = parseInt(splitExp[1]);

  if (!isSafeInt(exponent)) throw new Error(`Number is too big. Input: ${input}`);

  if (exponent < 0) {
    if (integer.length <= -exponent) {
      integer = integer.padStart(-exponent, '0');
      return `0.${integer}${decimal}`.replace(/0+$/, '');
    }
    const cutOff = integer.length + exponent;
    decimal = integer.substring(cutOff) + decimal;
    integer = integer.substring(0, cutOff);
  } else if (exponent > 0) {
    if (decimal.length <= exponent) {
      decimal = decimal.padEnd(exponent, '0');
      return `${integer}${decimal}`.replace(/^0+/, '');
    }
    integer += decimal.substring(0, exponent);
    decimal = decimal.substring(exponent);
  }
  if (integer.match(/^0+/)) integer = integer.replace(/^0+/, '');
  if (decimal) return `${integer || 0}.${decimal}`.replace(/0+$/, '');
  return `${integer}`.replace(/^0+/, '') || '0';
}

export default function parser(input) {
  if (isZero(input)) {
    return {
      numer: [0],
      denom: [1],
      positivity: 0,
    };
  }
  let positivity = isNeg(input) ? -1 : 1;
  if (positivity === -1) {
    if (typeof input === 'number') input *= -1;
    else if (typeof input === 'string') input = input.substr(1);
  }

  if (isPureInt(input)) {
    return {
      numer: getArnumFromPureInt(input),
      denom: [1],
      positivity,
    };
  }

  if (isSciNot(input + '')) {
    input = getStringNumFromSciNot(input + '');
  }
  if (isStringInt(input)) {
    return {
      numer: getArnumFromStringInt(input),
      denom: [1],
      positivity,
    };
  }
  if (isDecimal(input)) {
    input = trimZeroes(input);
  }
}
