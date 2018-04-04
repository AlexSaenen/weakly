import React from 'react';
import Weekday from 'components/Weekday';
import Wrapper from './Wrapper';
import Grid from './Grid';

// const tasks = [
// {
//   name: 'hello',
//   day: 'monday',
//   hour: '1PM',
// }
// ];

export default function Planner() {
  console.log('Planner.render()');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Wrapper>
      <Grid> {/* TODO: could be abstracted/renamed to just a horizontal responsive grid */}
        {weekDays.map(day => <Weekday day={day} key={day} />)}
      </Grid>
    </Wrapper>
  );
}
