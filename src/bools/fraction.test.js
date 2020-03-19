import isFraction from './fraction'
  
  describe('isFraction', () => {
    it('correctly identifies valid fraction', () => {
      expect(isFraction('2/3')).toBe(true);
      expect(isFraction('0/3')).toBe(true);
      expect(isFraction('0/123')).toBe(true);
      expect(isFraction('123456789/3')).toBe(true);
      expect(isFraction('123456789/1')).toBe(true);
      
      expect(isFraction('1/0')).toBe(false);
      expect(isFraction('12345/0')).toBe(false);
      expect(isFraction('1/')).toBe(false);
      expect(isFraction('123/')).toBe(false);
      expect(isFraction('/123')).toBe(false);
      expect(isFraction('/1')).toBe(false);
      expect(isFraction('1.23/2')).toBe(false);
      expect(isFraction('1/2.345')).toBe(false);
    });
    
    it('correctly identifies valid mixed numbers', () => {
        expect(isFraction('99 2/3')).toBe(true);
        expect(isFraction('99 2/3')).toBe(true);
        expect(isFraction('99 0/3')).toBe(true);
        expect(isFraction('99 0/123')).toBe(true);
        expect(isFraction('99 123456789/3')).toBe(true);
        expect(isFraction('99 123456789/1')).toBe(true);

        expect(isFraction('0 2/3')).toBe(true);
        expect(isFraction('0 0/3')).toBe(true);
        expect(isFraction('0 0/123')).toBe(true);
        expect(isFraction('0 123456789/3')).toBe(true);
        expect(isFraction('0 123456789/1')).toBe(true);
        
        expect(isFraction('1 1/0')).toBe(false);
        expect(isFraction('1 12345/0')).toBe(false);
        expect(isFraction('1 1/')).toBe(false);
        expect(isFraction('1 123/')).toBe(false);
        expect(isFraction('1 /123')).toBe(false);
        expect(isFraction('1 /1')).toBe(false);
        expect(isFraction('1 1.23/2')).toBe(false);
        expect(isFraction('1 1/2.345')).toBe(false);

        expect(isFraction('1.24 1/0')).toBe(false);
        expect(isFraction('1.24 12345/0')).toBe(false);
        expect(isFraction('1.24 1/')).toBe(false);
        expect(isFraction('1.24 123/')).toBe(false);
        expect(isFraction('1.24 /123')).toBe(false);
        expect(isFraction('1.24 /1')).toBe(false);
        expect(isFraction('1.24 1.23/2')).toBe(false);
        expect(isFraction('1.24 1/2.345')).toBe(false);
    })
  });