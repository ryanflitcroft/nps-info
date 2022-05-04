export default function handleParksData(data) {
  return data.map((i) => ({
    id: i.id,
    npsUrl: i.url,
    parkName: i.fullName,
    parkCode: i.parkCode,
    description: i.description,
    images: i.images,
  }));
}
