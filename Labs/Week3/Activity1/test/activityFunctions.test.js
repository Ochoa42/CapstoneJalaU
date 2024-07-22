const { curriedVolume, animalSound, sportAction } = require('../src/activityFunctions.js');

describe('curriedVolume', () => {
    test('calculates volume correctly for length=3, width=4, height=5', () => {
      expect(curriedVolume(3)(4)(5)).toBe(60);
    });
  
    test('calculates volume correctly for length=6, width=7, height=8', () => {
      expect(curriedVolume(6)(7)(8)).toBe(336);
    });
  
    test('calculates volume correctly for length=1, width=2, height=3', () => {
      expect(curriedVolume(1)(2)(3)).toBe(6);
    });

    test('calculates volume correctly for length=0, width=4, height=5', () => {
      expect(curriedVolume(0)(4)(5)).toBe(0);
    });

    test('calculates volume correctly for length=3, width=0, height=5', () => {
      expect(curriedVolume(3)(0)(5)).toBe(0);
    });

    test('calculates volume correctly for length=3, width=4, height=0', () => {
      expect(curriedVolume(3)(4)(0)).toBe(0);
    });

    test('calculates volume correctly for length=-3, width=4, height=5', () => {
      expect(curriedVolume(-3)(4)(5)).toBe(-60);
    });

    test('calculates volume correctly for length=3, width=-4, height=5', () => {
      expect(curriedVolume(3)(-4)(5)).toBe(-60);
    });

    test('calculates volume correctly for length=3, width=4, height=-5', () => {
      expect(curriedVolume(3)(4)(-5)).toBe(-60);
    });

    test('calculates volume correctly for length=1000, width=2000, height=3000', () => {
      expect(curriedVolume(1000)(2000)(3000)).toBe(6000000000);
    });
});

describe('animalSound', () => {
    test('returns correct sound for duck', () => {
      expect(animalSound("duck")("quack")).toBe("duck makes a quack sound.");
    });
  
    test('returns correct sound for sheep', () => {
      expect(animalSound("sheep")("baa")).toBe("sheep makes a baa sound.");
    });
  
    test('returns correct sound for lion', () => {
      expect(animalSound("lion")("roar")).toBe("lion makes a roar sound.");
    });

    test('returns correct sound for empty animal name and sound', () => {
      expect(animalSound("")("")).toBe(" makes a  sound.");
    });

    test('returns correct sound for empty animal name with non-empty sound', () => {
      expect(animalSound("")("bark")).toBe(" makes a bark sound.");
    });

    test('returns correct sound for non-empty animal name with empty sound', () => {
      expect(animalSound("dog")("")).toBe("dog makes a  sound.");
    });

    test('returns correct sound for very long animal name', () => {
      expect(animalSound("a".repeat(1000))("meow")).toBe(`${"a".repeat(1000)} makes a meow sound.`);
    });

    test('returns correct sound for very long sound', () => {
      expect(animalSound("cat")("b".repeat(1000))).toBe("cat makes a " + "b".repeat(1000) + " sound.");
    });
});

describe('sportAction', () => {
  test('returns correct action for soccer player', () => {
    expect(sportAction("soccer")("scores")("Messi")).toBe("Messi scores in soccer");
  });

  test('returns correct action for basketball player', () => {
    expect(sportAction("basketball")("dunks")("Jordan")).toBe("Jordan dunks in basketball");
  });

  test('returns correct action for tennis player', () => {
    expect(sportAction("tennis")("serves")("Federer")).toBe("Federer serves in tennis");
  });

  test('returns correct action for empty sport, action, and player', () => {
    expect(sportAction("")("")("")).toBe(" performs  in ");
  });

  test('returns correct action for empty sport with non-empty action and player', () => {
    expect(sportAction("")("jumps")("Alice")).toBe("Alice jumps in ");
  });

  test('returns correct action for very long sport name', () => {
    expect(sportAction("a".repeat(1000))("scores")("Messi")).toBe(`Messi scores in ${"a".repeat(1000)}`);
  });

  test('returns correct action for very long action', () => {
    expect(sportAction("soccer")("a".repeat(1000))("Messi")).toBe(`Messi ${"a".repeat(1000)} in soccer`);
  });

  test('returns correct action for very long player name', () => {
    expect(sportAction("soccer")("scores")("a".repeat(1000))).toBe(`${"a".repeat(1000)} scores in soccer`);
  });
});