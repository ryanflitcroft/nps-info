export default function handleParksData(data) {
  return data.map((i) => ({
    id: i.id,
    npsUrl: i.url,
    parkName: i.fullName,
    parkCode: i.parkCode,
    description: i.description,
    activities: i.activities,
    states: i.states,
    entranceFees: i.entranceFees,
    entrancePasses: i.entrancePasses,
    directionsUrl: i.directionsUrl,
    images: i.images,
  }));
}
