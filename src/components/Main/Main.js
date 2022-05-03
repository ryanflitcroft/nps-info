import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/">
            {/* list view */}
          </Route>
          <Route exact path="/:parkCode">
            {/* detail view */}
          </Route>
        </Switch>
      </main>
    </>
  );
}
