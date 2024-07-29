import { isDateTomorrowYesterdayFutureOrPast } from "../src/activity1.js";

// Helper function to mock the current date
const mockCurrentDate = (year, month, day) => {
  const originalDate = Date;
  global.Date = class extends Date {
    constructor(...args) {
      if (args.length === 0) {
        return new originalDate(year, month, day);
      }
      return new originalDate(...args);
    }
  };
};

describe('isDateTomorrowYesterdayFutureOrPast', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return "Yesterday" for a date that is one day before today (mocked today is 2022-03-12)', () => {
    mockCurrentDate(2022, 3, 12); // Mock today as 12th April 2022 (month is 0-indexed)
    expect(isDateTomorrowYesterdayFutureOrPast(new Date(2022, 3, 11))).toBe('Yesterday');
  });

  test('should return "Tomorrow" for a date that is one day after today (mocked today is 2022-03-12)', () => {
    mockCurrentDate(2022, 3, 12); // Mock today as 12th April 2022 (month is 0-indexed)
    expect(isDateTomorrowYesterdayFutureOrPast(new Date(2022, 3, 13))).toBe('Tomorrow');
  });

  test('should return "Future" for a date that is in the future (mocked today is 2024-03-16)', () => {
    mockCurrentDate(2024, 3, 16); // Mock today as 16th April 2024 (month is 0-indexed)
    expect(isDateTomorrowYesterdayFutureOrPast(new Date(2024, 3, 19))).toBe('Future');
  });

  test('should return "Past" for a date that is in the past (mocked today is 2020-03-11)', () => {
    mockCurrentDate(2020, 3, 24); // Mock today as 11th April 2020 (month is 0-indexed)
    expect(isDateTomorrowYesterdayFutureOrPast(new Date(2020, 3, 10))).toBe('Past');
  });
});