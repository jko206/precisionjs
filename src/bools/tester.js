import MAX_ARNUM_DIGIT from '~/src/constants';

export const isZero = n => n === 0 || /0(\.0)?/.test(n);

export const isNeg = n =>
  (typeof n === 'number' && n < 0) || (typeof n === 'string' && isStringInt(n) && n[0] === '-');

export const isPureInt = n => n === parseInt(n) && Math.abs(n) !== Infinity;

export const isStringInt = n => /^\-?\d+$/;

export const isPureStringInt = n => isStringInt(n) && isPureInt(parseInt(n));

export const isSafeInt = n => Math.abs(n) <= Number.MAX_SAFE_INTEGER;

export const isSafeArnumDigit = n => Math.abs(n) <= MAX_ARNUM_DIGIT;

export const isSciNotInt = n => {
  if (!isSciNot(n)) return false;
  // n = `${n}`;
  // const decDigits = n.idnexOf('e') - n.indexOf('.');
  // const order = n.match(/\d+$/)[0];
  // return order >= decDigits;
};

export const isSciNot = n => /^\-?\d+(\.\d+)?e(\+|\-)?\d+$/.test(`${n}`);

export const isDecimal = n => /^([1-9]\d*|0)\.\d+/.test(n);
