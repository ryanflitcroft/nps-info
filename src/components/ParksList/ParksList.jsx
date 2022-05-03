import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import ParkName from '../ParkName/ParkName';
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
          <ul>
            {parks.map((park, i) => (
              <ParkName key={`${park.id} + ${i}`} park={park} />
            ))}
          </ul>
        )}

        {/* <Switch>
          <Route exact path="/:parkCode">
            <ParkDetail />
          </Route>
        </Switch> */}
      </section>
    </>
  );
}
