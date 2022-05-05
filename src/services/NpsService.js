import handleParksData from '../utils/handleParksData';

export default async function getParks(param, query) {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks/?${param}=${query}`,
    {
      headers: {
        'X-Api-Key': `${process.env.NPS_KEY}`,
      },
    }
  );

  const { data } = await res.json();
  const parksData = handleParksData(data);

  return parksData;
}
