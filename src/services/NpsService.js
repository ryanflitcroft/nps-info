import handleParksData from '../utils/handleParksData';

export default async function getParks(stateCode) {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks/?stateCode=${stateCode}`,
    {
      headers: {
        'X-Api-Key': `${process.env.NPS_KEY}`,
      },
    }
  );

  const { data } = res.json();

  return handleParksData(data);
}
