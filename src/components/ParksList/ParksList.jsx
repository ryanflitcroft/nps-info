import React from 'react';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import getParks from '../../services/NpsService';
import ParkDetail from '../ParkDetail/ParkDetail';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ParksList({ stateCode }) {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url, path } = useRouteMatch();
  console.log('url: ', url, 'path: ', path);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      history.push('/');
      setIsLoading(true);
      const data = await getParks('stateCode', stateCode);
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
        <ParkDetail isLoading={isLoading} setIsLoading={setIsLoading} />
      </Route>
    </>
  );
}
