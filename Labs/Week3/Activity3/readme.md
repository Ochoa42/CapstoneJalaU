## Function Composition in JavaScript

Function composition is a technique used in programming to combine multiple functions into a single function. In JavaScript, it allows you to build more complex functionalities by combining reusable functions. This is particularly useful in functional programming, where functions are treated as first-class citizens and can be passed and composed.

### Objective

Deepen your understanding of function composition in JavaScript by composing functions to perform a series of transformations on an array of objects. This lab will involve more complex transformations and higher-order functions.

### Activity Description

#### First Exercise: Process People

Compose the previously defined functions to create a new function called `processPeople` that will take an array of person objects and apply the following operations in sequence: filter adults, get names, sort by name, and convert to uppercase.

When `processPeople` is applied to the provided array of person objects, it should return a sorted array of uppercase names of people who are 18 years old or older.

**Functions to Compose**

1. `filterAdults`: Filters an array of person objects to include only those who are 18 years or older.
2. `getNames`: Maps an array of person objects to an array of their names.
3. `sortByName`: Sorts an array of names alphabetically.
4. `toUpperCase`: Converts each name in the array to uppercase.

#### Second Exercise: Setup Device

Compose the provided functions turnOn, setVolume, and setChannel to create a new composed function called setupDevice that will take a device object and apply the following operations in sequence: turn on the device, set its volume, and set its channel.

**Functions to Compose**
1. `turnOn`: sets the isOn property of the device to true.
2. `setVolume`: sets the volume property of the device to 50.
3. `setChannel`: sets the channel property of the device to 7.
4. `compose`: creates a new function setupDevice that applies these operations in sequence.

### Running Tests

To run the tests and ensure that the functions work correctly, use the following command in your terminal:

```
npm test
```