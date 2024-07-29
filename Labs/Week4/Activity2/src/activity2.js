import axios from 'axios';

export async function getCatFacts() {
  const response = await axios.get("https://catfact.ninja/fact");
  return response.data;
}

export async function getShowMoreButton() {
    const catFact = await getCatFacts();
  
    if (catFact.fact.length > 100) {
      // Asegúrate de truncar a 100 caracteres y añadir '...Show more'
      return catFact.fact.slice(0, 100) + '...Show more';
    }
  
    return catFact.fact;
  }
  