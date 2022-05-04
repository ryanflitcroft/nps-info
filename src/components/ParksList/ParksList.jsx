import React from 'react';
import { Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import getParks from '../../services/NpsService';
import ParkDetail from '../ParkDetail/ParkDetail';
import './ParksList.css';

export default function ParksList({ setParkState }) {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url, path } = useRouteMatch();
  const { stateCode } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setParkState(stateCode);
      const data = await getParks('stateCode', stateCode);
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
              <li key={`${park.id} + ${i}`}>
                <Link to={`${url}/${park.parkCode}`}>{park.parkName}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Route exact path={`${path}/:parkCode`}>
        <ParkDetail isLoading={isLoading} setIsLoading={setIsLoading} />
      </Route>
    </>
  );
}
