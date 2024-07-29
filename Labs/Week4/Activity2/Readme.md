# Fetching and Truncating Cat Facts

This document explains the implementation of fetching cat facts and truncating them for display. It also includes unit tests and dependencies.

## Code Implementation

### Functions

#### getCatFacts

This function makes an HTTP GET request to the https://catfact.ninja/fact API endpoint using axios. It returns the response data containing a random cat fact.


#### getShowMoreButton

This function calls getCatFacts to fetch a cat fact. If the length of the cat fact exceeds 100 characters, it truncates the fact to 100 characters and appends ...Show more. If the fact is 100 characters or fewer, it returns the fact as is.

### Unit Tests
The following tests use axios-mock-adapter to mock HTTP requests and verify the behavior of the getShowMoreButton function.

### Explanation
- **MockAdapter:** Used to mock axios requests in unit tests. mock.onGet is used to mock GET requests to the https://catfact.ninja/fact endpoint, returning predefined responses.

- **Tests:** First Test: Checks that if the cat fact length is greater than 100, the returned string is truncated and ends with ...Show more.
Second Test: Ensures that if the cat fact length is 100 characters or fewer, it is returned as is.

### Dependencies
- **axios:** A promise-based HTTP client for the browser and Node.js. It is used for making HTTP requests to fetch cat facts.

```Installation: npm install axios```
- **axios-mock-adapter:** A library for mocking axios requests in unit tests. It allows defining responses for axios requests without making actual HTTP calls.

Installation: 
```
npm install axios-mock-adapter
```

### Usage

**initialization of npm**
```
npm init -y
```
**install node**
```
npm i
```
**Install jest**
```
npm install jest
```
-  When you finish installing all the dependencies, run the following command to run the unit tests and code coverage

```
npm test
```
