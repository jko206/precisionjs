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