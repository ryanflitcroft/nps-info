import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ParksList from '../ParksList/ParksList';
import StateSelect from '../StateSelect/StateSelect';

export default function Main() {
  const [stateCode, setStateCode] = useState('OR');

  return (
    <>
      <main>
        <StateSelect stateCode={stateCode} setStateCode={setStateCode} />
        <Switch>
          <Route path="/">
            <ParksList stateCode={stateCode} />
          </Route>
        </Switch>
      </main>
    </>
  );
}
