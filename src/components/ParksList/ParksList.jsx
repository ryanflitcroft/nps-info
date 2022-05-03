import React from 'react';
import { useState, useEffect } from 'react';
import getParks from '../../services/NpsService';
import ParkCard from '../ParkCard/ParkCard';

export default function ParksList() {
  const [parks, setParks] = useState([]);
  const [stateCode, setStateCode] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await getParks(stateCode);
      setParks(data);
    };
  }, [stateCode]);

  return (
    <>
      <section>
        {parks.map((park, i) => {
          <ParkCard key={`${park.id} + ${i}`} park={park} />;
        })}
      </section>
    </>
  );
}
