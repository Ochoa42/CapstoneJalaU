const { setupDevice } = require('../src/activity_2_Functions.js');

describe('setupDevice', () => {
  const device = {
    name: 'TV',
    isOn: false,
    volume: 0,
    channel: 1
  };

  test('turns on the device, sets volume, and sets channel', () => {
    expect(setupDevice(device)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device that is already on', () => {
    const deviceOn = {
      name: 'TV',
      isOn: true,
      volume: 10,
      channel: 5
    };
    expect(setupDevice(deviceOn)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with a non-zero volume', () => {
    const deviceVolume = {
      name: 'TV',
      isOn: false,
      volume: 25,
      channel: 1
    };
    expect(setupDevice(deviceVolume)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with a non-zero channel', () => {
    const deviceChannel = {
      name: 'TV',
      isOn: false,
      volume: 0,
      channel: 10
    };
    expect(setupDevice(deviceChannel)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with non-default name', () => {
    const deviceName = {
      name: 'Radio',
      isOn: false,
      volume: 0,
      channel: 1
    };
    expect(setupDevice(deviceName)).toEqual({
      name: 'Radio',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with all properties already set correctly', () => {
    const deviceAllSet = {
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    };
    expect(setupDevice(deviceAllSet)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with some properties not set', () => {
    const devicePartiallySet = {
      name: 'TV',
      isOn: false,
      volume: 50,
      channel: 1
    };
    expect(setupDevice(devicePartiallySet)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });

  test('handles a device with extreme values for volume and channel', () => {
    const deviceExtreme = {
      name: 'TV',
      isOn: false,
      volume: 100,
      channel: 100
    };
    expect(setupDevice(deviceExtreme)).toEqual({
      name: 'TV',
      isOn: true,
      volume: 50,
      channel: 7
    });
  });
});