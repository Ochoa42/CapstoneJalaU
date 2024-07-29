import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getShowMoreButton } from '../src/activity2.js';

describe('getShowMoreButton', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test('should return shortened cat fact with "...Show more" if length is greater than 100', async () => {
    const longCatFact = {
      fact: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id urna lorem. Sed at orci turpis. Phasellus gravida venenatis.'
    };

    mock.onGet("https://catfact.ninja/fact").reply(200, longCatFact);

    const result = await getShowMoreButton();
    console.log("recibido1:",result)
    // Ajusta el texto esperado
    expect(result).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id urna lorem. Sed at orci turpis. P...Show more');
  });

  test('should return the cat fact if length is 100 or less', async () => {
    const shortCatFact = {
      fact: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };

    mock.onGet("https://catfact.ninja/fact").reply(200, shortCatFact);

    
    const result = await getShowMoreButton();
    console.log("recibido:",result)
    expect(result).toBe(shortCatFact.fact);
  });
});
