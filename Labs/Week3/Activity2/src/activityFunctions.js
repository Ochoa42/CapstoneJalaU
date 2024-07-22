const calculateVolume = (length, width, height) => length * width * height;

const calculateVolumeWithFixedLengthAndWidth = calculateVolume.bind(null, 4, 3);

const planActivity = (activityName, duration, numberOfKids) => {
    return `${numberOfKids} kids will enjoy ${activityName} for ${duration} minutes.`;
  };
  
  // Partially applied functions with fixed durations
  const planPaintingActivity = planActivity.bind(null, 'Painting', 30);
  const planReadingActivity = planActivity.bind(null, 'Reading', 20);
  const planOutdoorActivity = (numberOfKids, duration) => planActivity('Outdoor Games', duration, numberOfKids);
  
  // Export functions
  module.exports = {
    calculateVolume,
    calculateVolumeWithFixedLengthAndWidth,
    planActivity,
    planPaintingActivity,
    planReadingActivity,
    planOutdoorActivity
  };