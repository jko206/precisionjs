import MAX_ARNUM_DIGIT from '~/src/constants';

function parseSafeInteger(input) {
  const n = parseInt(input);
  if (`${n}` === input && n < MAX_ARNUM_DIGIT) {
    return {
      numer: [n],
      denom: [1],
    };
  }
}

function parseInteger(input) {}

const parsers = [parseSafeInteger];

export default function parser(input) {
  const output = parsers.find(fn => fn(input));
  if (!output) throw new Error(`Invalid input: ${input}`);
  return output;
}
