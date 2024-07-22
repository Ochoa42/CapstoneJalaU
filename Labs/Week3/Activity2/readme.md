## Partial Application in JavaScript

### Background

Partial application allows you to create more reusable functions by fixing some of the arguments. This can lead to cleaner and more maintainable code, especially when dealing with functions that are frequently used with the same initial arguments.

By understanding and utilizing partial application, you can improve your functional programming skills and overall code quality.

### Objective

Understand and implement partial application in JavaScript to create more modular and reusable functions.

### Activity Description

#### First Exercise: Calculate Volume

Using the concepts of partial application, create a function `calculateVolume` that takes three arguments: `length`, `width`, and `height`, and returns the volume of a water tank in a building as a rectangular prism. 

Then, create a partially applied function `calculateVolumeWithFixedLengthAndWidth` with a fixed length of 4 and width of 3.

Finally, use this partially applied function to calculate the volume of rectangular prisms with heights of 5, 10, and 15.

**Function Definitions**

- calculateVolume:  is a general function that takes length, width, and height to calculate the volume.

- calculateVolumeWithFixedLengthAndWidth: uses bind to fix the length to 4 and width to 3, creating a new function that only requires the height to calculate the volume.


### Second Exercise: Plan Activity

Create a function that plans a play activity for kids. The function will take three arguments: activityName, duration (in minutes), and numberOfKids. Using partial application, create specific functions for different activities with predefined durations. Finally, use these functions to plan activities for different numbers of kids.

- planActivity:  is a general function that takes activityName, duration, and numberOfKids to create a plan description.
- planPaintingActivity: planReadingActivity, and planOutdoorActivity use bind to fix the activityName and duration, creating new functions that only require the numberOfKids to create the plan description.

### Running Tests

To run the tests and ensure that the functions work correctly, use the following command in your terminal:

```
npm test
```