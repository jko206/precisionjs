import parser, {
  getArnumFromPureInt,
  chunkString,
  getStringNumFromSciNot,
} from '~/src/parser/parser';
import { MAX_ARNUM_DIGIT } from '~/src/constants';

// describe('parse decimal', () => {
//   it('parse num passed as string', () => {
//     const input = '123456789';
//     const output = {
//       numer: [123456789],
//       denom: [1],
//     };
//     expect(parser(input)).toBe(output);
//   });
//   it('parse num passed as number', () => {});
// });

describe('getArnumFromPureInt', () => {
  it('parses small int correctly', () => {
    expect(getArnumFromPureInt(12345)).toEqual([12345]);
  });

  it('parses big safe int correctly', () => {
    const output = getArnumFromPureInt(MAX_ARNUM_DIGIT ** 2);
    expect(output).toEqual([0, 0, 1]);
  });
});

describe('chunkString()', () => {
  it('turns string into an array such that each element has n-length str', () => {
    const arr = ['ABCDEFG', 'HIJKLMN', 'OPQRSTU', 'VWXYZ01', '2345678', '90'];
    expect(chunkString(arr.join(''))).toEqual(arr);
  });
});

describe('getStringNumFromSciNot', () => {
  it('turns scientific notation into string number', () => {
    const tests = [
      { input: '1e0', expected: '1' },
      { input: '1e1', expected: '10' },
      { input: '1e5', expected: '100000' },
      { input: '1.00e5', expected: '100000' },
      { input: '0.001e3', expected: '1' },
      { input: '0.001e2', expected: '0.1' },
      { input: '0.001e0', expected: '0.001' },
      { input: '100e2', expected: '10000' },
      { input: '100.000e2', expected: '10000' },
    ];

    tests.forEach(({ input, expected }) => {
      const output = getStringNumFromSciNot(input);
      expect(output).toBe(expected);
    });
  });
});

// describe('parse integers', () => {
//   it('parse num passed as string', () => {});
//   it('parse num passed as number', () => {});
//   it('parse num passed as BigInt', () => {});
// });

// describe('parse fraction', () => {
//   it('separates integer part from fraction part', () => {});
// });
