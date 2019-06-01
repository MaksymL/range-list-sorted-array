const { leftMost } = require('../utils/binary-search');
const { concatByIndexes, removeByIndexes } = require('../utils/array');

class RangeList {
  constructor() {
    this.ranges = []; // should be sorted
  }

  /**
  * static helper to validate range
  * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
  */
  static checkRange(range) {
    if (!Array.isArray(range)) {
      throw Error('Range must be of type array!');
    }
    if (range.length !== 2) {
      throw Error('Range must contain two boundaries!');
    }
    const [min, max] = range;
    if (min > max) {
      throw Error('Max should be bigger than min in range!');
    }
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    RangeList.checkRange(range);
    if (!this.ranges.length) {
      this.ranges = this.ranges.concat(range);
      return true;
    }
    const [min, max] = range;
    const minIndex = leftMost(this.ranges, min);
    const maxIndex = leftMost(this.ranges, max);
    this.ranges = concatByIndexes(this.ranges, range, minIndex, maxIndex);
    return true;
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    RangeList.checkRange(range);
    if (!this.ranges.length) {
      return true;
    }
    const [min, max] = range;
    const minIndex = leftMost(this.ranges, min);
    const maxIndex = leftMost(this.ranges, max);
    this.ranges = removeByIndexes(this.ranges, range, minIndex, maxIndex);
    return true;
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const rangesLength = this.ranges.length;
    let output = '';
    for (let index = 0; index < rangesLength; index += 2) {
      if (!output) {
        output = `[${this.ranges[index]}, ${this.ranges[index + 1]})`;
      } else {
        output = `${output} [${this.ranges[index]}, ${this.ranges[index + 1]})`;
      }
    }
    console.log(output);
  }
}

module.exports = RangeList;
