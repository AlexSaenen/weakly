import React from 'react';
import Weekday from 'containers/Weekday';
import Wrapper from './Wrapper';
import Grid from './Grid';

export default function Planner() {
  console.log('Planner.render()');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Wrapper>
      <Grid> {/* TODO: could be renamed to a horizontal responsive grid */}
        {weekDays.map(day => <Weekday day={day} key={day} />)}
      </Grid>
    </Wrapper>
  );
}
