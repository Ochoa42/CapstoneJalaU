# Date Comparator

This project includes a function to compare dates and determine if they are in the past, future, yesterday, or tomorrow in relation to the current date.

## Main Function

### isDateTomorrowYesterdayFutureOrPast

This function takes a date as an argument and compares it with the current date. It returns a string indicating whether the date is:

- "Yesterday"
- "Tomorrow"
- "Future"
- "Past"

The function uses JavaScript's `getDate()` method to compare the days of the month.

## Usage Examples

Several examples of using the function with different dates in 2024 are provided.

## Tests

The project includes a set of unit tests using Jest.

### Dependencies

- Jest: JavaScript testing framework

### Test Helper Functions

- `mockCurrentDate`: A helper function to simulate the current date in tests.

### Test Cases

The tests cover the following scenarios:

1. Verify if the function returns "Yesterday" for a date one day before the simulated date.
2. Verify if the function returns "Tomorrow" for a date one day after the simulated date.
3. Verify if the function returns "Future" for a date in the future.
4. Verify if the function returns "Past" for a date in the past.

Each test uses `mockCurrentDate` to simulate a specific date and then checks if the function returns the expected result.

### Usage

```
npm test
```
