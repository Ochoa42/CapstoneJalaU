const { processPeople } = require('../src/activity_1_Functions.js');

describe('processPeople', () => {
  const people = [
    { name: 'Jolie', age: 25 },
    { name: 'Janine', age: 17 },
    { name: 'Arthur', age: 30 },
    { name: 'Bela', age: 16 },
    { name: 'Charlot', age: 20 }
  ];

  test('filters adults, gets names, sorts by name, and converts to uppercase', () => {
    expect(processPeople(people)).toEqual(['ARTHUR', 'CHARLOT', 'JOLIE']);
  });

  test('handles an empty array', () => {
    expect(processPeople([])).toEqual([]);
  });

  test('handles an array with no adults', () => {
    const noAdults = [
      { name: 'Janine', age: 17 },
      { name: 'Bela', age: 16 }
    ];
    expect(processPeople(noAdults)).toEqual([]);
  });

  test('handles an array with all adults', () => {
    const allAdults = [
      { name: 'Jolie', age: 25 },
      { name: 'Arthur', age: 30 },
      { name: 'Charlot', age: 20 }
    ];
    expect(processPeople(allAdults)).toEqual(['ARTHUR', 'CHARLOT', 'JOLIE']);
  });

  test('handles names with mixed casing', () => {
    const mixedCase = [
      { name: 'jolie', age: 25 },
      { name: 'ARTHUR', age: 30 },
      { name: 'Charlot', age: 20 }
    ];
    expect(processPeople(mixedCase)).toEqual(['ARTHUR', 'CHARLOT', 'JOLIE']);
  });

  test('handles names with special characters', () => {
    const specialChars = [
      { name: 'Jolie!', age: 25 },
      { name: 'Arthur$', age: 30 },
      { name: 'Charlot#', age: 20 }
    ];
    expect(processPeople(specialChars)).toEqual(['ARTHUR$', 'CHARLOT#', 'JOLIE!']);
  });

  test('handles names with spaces', () => {
    const namesWithSpaces = [
      { name: 'Jo lie', age: 25 },
      { name: 'Ar thur', age: 30 },
      { name: 'Char lot', age: 20 }
    ];
    expect(processPeople(namesWithSpaces)).toEqual(['AR THUR', 'CHAR LOT', 'JO LIE']);
  });

  test('handles names with numbers', () => {
    const namesWithNumbers = [
      { name: 'Jolie1', age: 25 },
      { name: 'Arthur2', age: 30 },
      { name: 'Charlot3', age: 20 }
    ];
    expect(processPeople(namesWithNumbers)).toEqual(['ARTHUR2', 'CHARLOT3', 'JOLIE1']);
  });
});