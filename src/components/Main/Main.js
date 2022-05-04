import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ParksList from '../ParksList/ParksList';
import StateSelect from '../StateSelect/StateSelect';
import './Main.css';

export default function Main() {
  const [parkState, setParkState] = useState('');

  return (
    <>
      <main>
        <Switch>
          <Route path="/">
            <StateSelect parkState={parkState} setParkState={setParkState} />
          </Route>
        </Switch>
      </main>
    </>
  );
}
