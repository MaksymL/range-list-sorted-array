/**
 * Concat two arrays with same indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} index index in array
 */
function replaceBySameIndexes(array, arrayToConcat, index) {
  const [min, max] = arrayToConcat;
  const nextIndex = index + 1;
  const cElem = array[index];
  const pElem = array[index - 1];
  if ((min >= pElem || max <= cElem) && index % 2) {
    return array;
  }
  let injectedArray = [min, max];
  if (min === pElem) {
    injectedArray = [max];
  } else if (max === cElem) {
    injectedArray = [min];
  }
  return [
    ...array.slice(0, index),
    ...injectedArray,
    ...array.slice(nextIndex, array.length)
  ];
}
/**
 * Concat two arrays with different indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} minIndex start index in array
 * @param {Number} maxIndex finish index in array
*/
function replaceByDifferentIndexes(array, arrayToConcat, minIndex, maxIndex) {
  const [min, max] = arrayToConcat;
  let injectedArray = [min, max];
  let nexIndex = maxIndex;
  if (min === array[minIndex] && max === array[maxIndex]) {
    injectedArray = [];
    nexIndex = maxIndex + 1;
  } else if (minIndex % 2 && !(maxIndex % 2)) {
    injectedArray = [max];
  } else if (maxIndex % 2 && !(minIndex % 2)) {
    injectedArray = [min];
  }
  return [
    ...array.slice(0, minIndex),
    ...injectedArray,
    ...array.slice(nexIndex, array.length)
  ];
}
/**
 * Remove from array by different indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} minIndex start index in array
 * @param {Number} maxIndex finish index in array
*/
function removeByDifferentIndexes(array, arrayToConcat, minIndex, maxIndex) {
  const [min, max] = arrayToConcat;
  let injectedArray = [min, max];
  if (minIndex % 2 && !(maxIndex % 2)) {
    injectedArray = [min];
  } else if (maxIndex % 2 && !(minIndex % 2)) {
    injectedArray = [max];
  }
  return [
    ...array.slice(0, minIndex),
    ...injectedArray,
    ...array.slice(maxIndex, array.length)
  ];
}
/**
 * Remove from array by same indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} index index in array
*/
function removeBySameIndexes(array, arrayToConcat, index) {
  const [min, max] = arrayToConcat;
  const cElem = array[index];
  const pElem = array[index - 1];
  let nextIndex = index;
  if (!(index % 2)) {
    return array;
  }
  let injectedArray = [min, max];
  if (min <= pElem) {
    injectedArray = [max];
  } else if (max >= cElem) {
    injectedArray = [min];
    nextIndex = index + 1;
  }
  return [
    ...array.slice(0, index),
    ...injectedArray,
    ...array.slice(nextIndex, array.length)
  ];
}
/**
 * Concat two arrays using indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} minIndex start index in array
 * @param {Number} maxIndex finish index in array
 */
exports.concatByIndexes = (array, arrayToConcat, minIndex, maxIndex) => {
  if (minIndex === maxIndex) {
    return replaceBySameIndexes(array, arrayToConcat, minIndex);
  }
  return replaceByDifferentIndexes(array, arrayToConcat, minIndex, maxIndex);
};

/**
 * Concat two arrays using indexes
 * @param {Array<number>} array
 * @param {Array<number>} arrayToConcat
 * @param {Number} minIndex start index in array
 * @param {Number} maxIndex finish index in array
 */
exports.removeByIndexes = (array, arrayToConcat, minIndex, maxIndex) => {
  if (minIndex === maxIndex) {
    return removeBySameIndexes(array, arrayToConcat, minIndex);
  }
  return removeByDifferentIndexes(array, arrayToConcat, minIndex, maxIndex);
};
