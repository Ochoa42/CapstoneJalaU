const {
    calculateVolume,
    calculateVolumeWithFixedLengthAndWidth,
    planActivity,
    planPaintingActivity,
    planReadingActivity,
    planOutdoorActivity
  } = require('../src/activityFunctions.js');
  
  describe('calculateVolume', () => {
    test('calculates volume correctly', () => {
      expect(calculateVolume(4, 3, 5)).toBe(60);
      expect(calculateVolume(4, 3, 10)).toBe(120);
      expect(calculateVolume(4, 3, 15)).toBe(180);
    });
  
    test('handles zero dimensions', () => {
      expect(calculateVolume(0, 3, 5)).toBe(0);
      expect(calculateVolume(4, 0, 5)).toBe(0);
      expect(calculateVolume(4, 3, 0)).toBe(0);
    });
  
    test('handles negative dimensions', () => {
      expect(calculateVolume(-4, 3, 5)).toBe(-60);
      expect(calculateVolume(4, -3, 5)).toBe(-60);
      expect(calculateVolume(4, 3, -5)).toBe(-60);
    });
  
    test('handles large dimensions', () => {
      expect(calculateVolume(1000, 1000, 1000)).toBe(1000000000);
    });
  });
  
  describe('calculateVolumeWithFixedLengthAndWidth', () => {
    test('calculates volume correctly with fixed length and width', () => {
      expect(calculateVolumeWithFixedLengthAndWidth(5)).toBe(60);
      expect(calculateVolumeWithFixedLengthAndWidth(10)).toBe(120);
      expect(calculateVolumeWithFixedLengthAndWidth(15)).toBe(180);
    });
  
    test('handles zero height', () => {
      expect(calculateVolumeWithFixedLengthAndWidth(0)).toBe(0);
    });
  
    test('handles negative height', () => {
      expect(calculateVolumeWithFixedLengthAndWidth(-5)).toBe(-60);
    });
  
    test('handles large height', () => {
      expect(calculateVolumeWithFixedLengthAndWidth(1000)).toBe(12000);
    });
  });
  
  describe('planActivity', () => {
    test('returns correct activity plan', () => {
      expect(planActivity('Painting', 30, 10)).toBe('10 kids will enjoy Painting for 30 minutes.');
      expect(planActivity('Reading', 20, 5)).toBe('5 kids will enjoy Reading for 20 minutes.');
      expect(planActivity('Outdoor Games', 45, 15)).toBe('15 kids will enjoy Outdoor Games for 45 minutes.');
    });
  
    test('handles zero duration', () => {
      expect(planActivity('Painting', 0, 10)).toBe('10 kids will enjoy Painting for 0 minutes.');
    });
  
    test('handles zero number of kids', () => {
      expect(planActivity('Painting', 30, 0)).toBe('0 kids will enjoy Painting for 30 minutes.');
    });
  
    test('handles empty activity name', () => {
      expect(planActivity('', 30, 10)).toBe('10 kids will enjoy  for 30 minutes.');
    });
  
    test('handles very long activity name', () => {
      expect(planActivity('A very long activity name that exceeds normal length', 30, 10)).toBe('10 kids will enjoy A very long activity name that exceeds normal length for 30 minutes.');
    });
  });
  
  describe('partially applied activity functions', () => {
    test('planPaintingActivity returns correct activity plan', () => {
      expect(planPaintingActivity(10)).toBe('10 kids will enjoy Painting for 30 minutes.');
    });
  
    test('planReadingActivity returns correct activity plan', () => {
      expect(planReadingActivity(5)).toBe('5 kids will enjoy Reading for 20 minutes.');
    });
  
    test('planOutdoorActivity returns correct activity plan', () => {
      expect(planOutdoorActivity(15, 45)).toBe('15 kids will enjoy Outdoor Games for 45 minutes.');
    });
  
    test('planPaintingActivity handles zero kids', () => {
      expect(planPaintingActivity(0)).toBe('0 kids will enjoy Painting for 30 minutes.');
    });
  
    test('planReadingActivity handles very large number of kids', () => {
      expect(planReadingActivity(1000)).toBe('1000 kids will enjoy Reading for 20 minutes.');
    });
  
    test('planOutdoorActivity handles zero duration', () => {
      expect(planOutdoorActivity(15, 0)).toBe('15 kids will enjoy Outdoor Games for 0 minutes.');
    });
  });