// customArrayMethods.js

/**
 * Custom implementation of Array.prototype.map
 * @param {Array} array - The array to map over
 * @param {Function} callback - The callback function to apply to each element
 * @returns {Array} - A new array with the results of calling the callback on every element
 */
function customMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

/**
 * Custom implementation of Array.prototype.reduce
 * @param {Array} array - The array to reduce
 * @param {Function} callback - The callback function to apply to each element
 * @param {*} initialValue - The initial value for the accumulator
 * @returns {*} - A single value accumulated from the results of calling the callback on every element
 */
function customReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

/**
 * Custom implementation of Array.prototype.filter
 * @param {Array} array - The array to filter
 * @param {Function} predicate - The predicate function to test each element
 * @returns {Array} - A new array with the elements that pass the predicate test
 */
function customFilter(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

/**
 * Custom implementation of Array.prototype.forEach
 * @param {Array} array - The array to iterate over
 * @param {Function} callback - The callback function to apply to each element
 */
function customForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

const numbers = [1, 2, 3, 4, 5];

const doubled = customMap(numbers, (num) => num * 2);
console.log('customMap:', doubled); // [2, 4, 6, 8, 10]

const sum = customReduce(numbers, (acc, num) => acc + num, 0);
console.log('customReduce:', sum); // 15

const evenNumbers = customFilter(numbers, (num) => num % 2 === 0);
console.log('customFilter:', evenNumbers); // [2, 4]

customForEach(numbers, (num) => {
    console.log('customForEach:', num);
});
