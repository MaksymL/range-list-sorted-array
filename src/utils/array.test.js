const { expect } = require('chai');
const { concatByIndexes, removeByIndexes } = require('./array');

describe('src/utils/array.js', () => {
  describe('#concatByIndexes', () => {
    it('should concat both arrays if indexes are even and equal', () => {
      const initialArray = [1, 5];
      const addedArray = [10, 20];
      const expectedArray = [1, 5, 10, 20];
      expect(concatByIndexes(initialArray, addedArray, 2, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return initial array if min and max in ranges list', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [20, 20];
      const expectedArray = [1, 5, 10, 20];
      expect(concatByIndexes(initialArray, addedArray, 3, 3))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [20, 21];
      const expectedArray = [1, 5, 10, 21];
      expect(concatByIndexes(initialArray, addedArray, 3, 4))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [2, 4];
      const expectedArray = [1, 5, 10, 20];
      expect(concatByIndexes(initialArray, addedArray, 1, 1))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [3, 8];
      const expectedArray = [1, 8, 10, 20];
      expect(concatByIndexes(initialArray, addedArray, 1, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [7, 10];
      const expectedArray = [1, 5, 7, 20];
      expect(concatByIndexes(initialArray, addedArray, 2, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [5, 8];
      const expectedArray = [1, 8, 10, 20];
      expect(concatByIndexes(initialArray, addedArray, 1, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [5, 10];
      const expectedArray = [1, 20];
      expect(concatByIndexes(initialArray, addedArray, 1, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 5, 10, 20];
      const addedArray = [9, 15];
      const expectedArray = [1, 5, 9, 20];
      expect(concatByIndexes(initialArray, addedArray, 2, 3))
        .to.deep.equal(expectedArray);
    });
  });
  describe('#removeByIndexes', () => {
    it('should NOT change ranges if boundries are equal and in ranges', () => {
      const initialArray = [1, 8, 10, 21];
      const removedArray = [10, 10];
      const expectedArray = [1, 8, 10, 21];
      expect(removeByIndexes(initialArray, removedArray, 2, 2))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 8, 10, 21];
      const removedArray = [10, 11];
      const expectedArray = [1, 8, 11, 21];
      expect(removeByIndexes(initialArray, removedArray, 2, 3))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 8, 10, 21];
      const removedArray = [15, 21];
      const expectedArray = [1, 8, 10, 15];
      expect(removeByIndexes(initialArray, removedArray, 3, 3))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 8, 11, 21];
      const removedArray = [15, 17];
      const expectedArray = [1, 8, 11, 15, 17, 21];
      expect(removeByIndexes(initialArray, removedArray, 3, 3))
        .to.deep.equal(expectedArray);
    });
    it('should return correctly replaced array', () => {
      const initialArray = [1, 8, 11, 15, 17, 21];
      const addedArray = [3, 19];
      const expectedArray = [1, 3, 19, 21];
      expect(concatByIndexes(initialArray, addedArray, 1, 5))
        .to.deep.equal(expectedArray);
    });
  });
});
