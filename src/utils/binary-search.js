/**
 * Helper to check correctness of provided arguments
 * @param {Array<number>} array
 * @param {Number} value
 */
function checkArguments(array, value) {
  if (!Array.isArray(array) || !Number.isInteger(value)) {
    throw new Error('Argument error in insertIndex search!');
  }
}
/**
 * Binary search to find index of the rightmost element in array
 * @param {Array<number>} array
 * @param {Number} value
 */
exports.leftMost = (array, value) => {
  checkArguments(array, value);
  if (!array.length) {
    return 0;
  }
  let left = 0;
  let right = array.length;
  let middle;
  while (left < right) {
    middle = Math.floor((left + right) / 2);
    if (array[middle] < value) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }
  return left;
};
