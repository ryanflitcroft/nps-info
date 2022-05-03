import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ParksList from '../ParksList/ParksList';
import ParkCard from '../ParkCard/ParkCard';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/">
            <ParksList />
          </Route>
          <Route exact path="/:stateCode">
            <ParkCard />
          </Route>
        </Switch>
      </main>
    </>
  );
}
