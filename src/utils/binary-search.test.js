/* eslint-disable */
const { expect } = require('chai');
const { leftMost } = require('./binary-search');

describe('src/utils/binary-search.js', () => {
  describe('#leftMost', () => {
    it('should throw correct error if called not on array', () => {
      expect(() => leftMost({}, 1)).to.throw(
        Error, 'Argument error in insertIndex search!'
      );
    });
    it('should throw correct error if trying to find not number', () => {
      expect(() => leftMost([], '1')).to.throw(
        Error, 'Argument error in insertIndex search!'
      );
    });
    it('should return 0 if called on empty array', () => {
      expect(leftMost([], 1)).to.equal(0);
    });
    it('should return correct index for insertion', () => {
      const arrayToSearch = [2, 5, 10, 13];
      expect(leftMost(arrayToSearch, 7)).to.equal(2);
      expect(leftMost(arrayToSearch, 11)).to.equal(3);
      expect(leftMost(arrayToSearch, 13)).to.equal(3);
      expect(leftMost(arrayToSearch, 15)).to.equal(4);
      expect(leftMost(arrayToSearch, 1)).to.equal(0);
    });
  });
});
