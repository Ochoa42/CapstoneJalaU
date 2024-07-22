const turnOn = device => ({ ...device, isOn: true });
const setVolume = volume => device => ({ ...device, volume });
const setChannel = channel => device => ({ ...device, channel });

const compose = (...funcs) => x => funcs.reduceRight((v, f) => f(v), x);

const setupDevice = device => compose(
  setChannel(7),
  setVolume(50),
  turnOn
)(device);

module.exports = {
  setupDevice
};