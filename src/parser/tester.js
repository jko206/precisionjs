import MAX_ARNUM_DIGIT from '~/src/constants';

export const isPureInt = n => n === Math.floor(n) && n !== Infinity;

export const isStringInt = n => n === `${parseInt(n)}` && isInt(parseInt(n));

export const isSafeInt = n => n <= Number.MAX_SAFE_INTEGER && n >= Number.MIN_SAFE_INTEGER;

export const isSciNotInt = n => {
  if (!isSciNot(n)) return false;
  n = `${n}`;
  const decDigits = n.idnexOf('e') - n.indexOf('.');
  const order = n.match(/\d+$/)[0];
  return order >= decDigits;
};

export const isSafeArnumDigit = n => n <= MAX_ARNUM_DIGIT;

export const isSciNot = n => /^\-?\d+\.\d+e(\+|\-)\d+$/.test(`${n}`);
