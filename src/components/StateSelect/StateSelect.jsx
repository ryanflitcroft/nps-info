import React, { useState } from 'react';
import ParksList from '../ParksList/ParksList';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { stateCodes } from '../../fixtures/stateCodes';

export default function StateSelect() {
  const [parkState, setParkState] = useState('');
  const { url, path } = useRouteMatch();
  const history = useHistory();

  function handleChange(e) {
    setParkState(e.target.value);
    history.push(`${url}${e.target.value}`);
  }

  return (
    <>
      <form aria-label="select a state to search National Parks">
        <label htmlFor="selectState">Select state/territory:</label>
        <select name="selectState" value={parkState} onChange={handleChange}>
          {stateCodes.map((i) => (
            <option key={`${i.code} ${i}`} value={i.code}>
              {i.name}
            </option>
          ))}
        </select>
      </form>

      <Route path={`${path}:stateCode`}>
        <ParksList setParkState={setParkState} />
      </Route>
    </>
  );
}
