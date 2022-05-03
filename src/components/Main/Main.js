import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ParksList from '../ParksList/ParksList';
import ParkCard from '../ParkCard/ParkCard';
import StateSelect from '../StateSelect/StateSelect';

export default function Main() {
  const [stateCode, setStateCode] = useState('OR');

  return (
    <>
      <main>
        <StateSelect stateCode={stateCode} setStateCode={setStateCode} />
        <Switch>
          <Route exact path="/">
            <ParksList stateCode={stateCode} />
          </Route>
          <Route exact path="/:stateCode">
            {/* <ParkCard /> */}
          </Route>
        </Switch>
      </main>
    </>
  );
}
