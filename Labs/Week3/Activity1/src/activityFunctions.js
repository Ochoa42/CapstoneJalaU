const curriedVolume = length => width => height => length * width * height;

const animalSound = animal => sound => `${animal} makes a ${sound} sound.`;

const sportAction = sport => action => player => {
  if (!sport && !action && !player) {
    return " performs  in ";
  }
  if (!action && !player) {
    return ` performs  in ${sport}`;
  }
  if (!player) {
    return `${action} in ${sport}`;
  }
  return `${player} ${action} in ${sport}`;
};

module.exports = {
  curriedVolume,
  animalSound,
  sportAction
};