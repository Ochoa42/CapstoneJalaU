## Activity 1: Partial Application

### Description

This activity focuses on partial application to create more specific functions from general ones using currying and partial application techniques.

### Objective

In this lab, you will create curried functions to perform specific tasks:

1. **Calculate the volume of a rectangular prism.**
2. **Describe animal sounds.**
3. **Describe actions in sports.**

### Functions

#### 1. `curriedVolume`

Calculates the volume of a rectangular prism using currying. The formula for the volume is:
```Volume = length × width × height```

#### 2. `animalSound`
Describes the sound made by an animal using currying.

#### 3. `SportAction`
Describes an action performed by a player in a sport using currying.

takes the name of a sport and returns a function that takes the action performed.
It then returns another function that takes the player's name and returns a string describing the player's action in the sport.


### Running Tests
To run the tests and ensure that the functions work correctly, use the following command in your terminal:

```
npm test
```