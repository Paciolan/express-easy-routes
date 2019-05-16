/**
 * Pushes an object into an Array and returns the mutated Array.
 * This is useful for reducers.
 * @param {Object} value Value to push onto Array.
 * @param {Array} array Array to push value onto.
 * @returns {Array} Returns the mutated Array.
 * @example
 * const array = [1, 2, 3];
 * push(4, array); //=> [1, 2, 3, 4]
 * array //=> [1, 2, 3, 4]
 */
const push = (value, array) => {
  array.push(value);
  return array;
};

module.exports = push;
