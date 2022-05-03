import React from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import getParks from '../../services/NpsService';
import ParkDetail from '../ParkDetail/ParkDetail';

export default function ParksList({ stateCode }) {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url, path } = useRouteMatch();
  console.log('url: ', url, 'path: ', path);

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
      <aside>
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {parks.map((park, i) => (
              <li key={`${park.id} + ${i}`}>
                <Link to={`${url}${park.parkCode}`}>{park.parkName}</Link>
                {console.log(`${path}:parkCode`)}
              </li>
            ))}
          </ul>
        )}
      </aside>
      <Route exact path={`${path}:parkCode`}>
        <ParkDetail />
      </Route>
    </>
  );
}
