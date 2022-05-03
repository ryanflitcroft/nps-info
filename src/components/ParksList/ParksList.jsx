import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import ParkCard from '../ParkCard/ParkCard';
import getParks from '../../services/NpsService';

export default function ParksList({ stateCode }) {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getParks(stateCode);
      setParks(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getParks(stateCode);
      setParks(data);
      setIsLoading(false);
    };
    getData();
  }, [stateCode]);

  return (
    <>
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          parks.map((park, i) => (
            <ParkCard key={`${park.id} + ${i}`} park={park} />
          ))
        )}
      </section>
    </>
  );
}
