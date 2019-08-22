import parser from '~/src/util/parser';

describe('parse decimal', () => {
  const tests = [
    {
      it: 'parse num passed as string',
      input: '1234567890',
      output: {
        numer: 1234567890,
        denom: 1,
      },
    },
  ];
  it('parse num passed as string', () => {
    const input = '123456789';
    const output = {
      numer: [123456789],
      denom: [1],
    };
    expect(parser(input)).toBe(output);
  });
  it('parse num passed as number', () => {});
});

describe('parse integers', () => {
  it('parse num passed as string', () => {});
  it('parse num passed as number', () => {});
  it('parse num passed as BigInt', () => {});
});

describe('parse fraction', () => {
  it('separates integer part from fraction part', () => {});
});
