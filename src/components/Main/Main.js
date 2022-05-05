import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import StateSelect from '../StateSelect/StateSelect';
import './Main.css';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/">
            <StateSelect />
          </Route>
        </Switch>
      </main>
    </>
  );
}
