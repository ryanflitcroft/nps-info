import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getParks from '../../services/NpsService';
import './ParkDetail.css';

export default function ParkDetail({ isLoading, setIsLoading }) {
  const { parkCode } = useParams();
  const [park, setPark] = useState({});

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const [data] = await getParks('parkCode', parkCode);
      setPark(data);
      setIsLoading(false);
    };
    getData();
  }, [parkCode]);

  return (
    <>
      <article>
        <h2>
          {park.parkName} - {park.parkCode}
        </h2>
        <p aria-label={`Description of ${park.parkName}`}>{park.description}</p>
        <section aria-label={`images of ${park.parkName}`}>
          {park.images?.map((image, i) => (
            <figure key={i}>
              <h3>{image.title}</h3>
              <img src={image.url} alt={image.altText} />
              <figcaption aria-label={`Describes ${image.title}`}>
                {image.caption} - {image.credit}
              </figcaption>
            </figure>
          ))}
        </section>
      </article>
    </>
  );
}
