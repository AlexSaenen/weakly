// @flow

import React from 'react';
import { connect } from 'react-redux';

import type { DayRange } from '@/hours';
import type { Tasks } from 'components/TasksList';
import type { State } from './reducer';

import Weekday from 'components/Weekday';
import Wrapper from './Wrapper';
import HorizontalGrid from './HorizontalGrid';

type Props = {
  +tasks: Tasks
};

const dayRange: DayRange = { startsAt: 7, lasts: 17 };
const weekDays: Array<string> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Planner = (props: Props) => {
  console.log('Planner.render()');
  const { tasks } = props;

  return (
    <Wrapper>
      <HorizontalGrid>
        {weekDays.map(day => <Weekday key={day} day={day} range={dayRange} tasks={tasks} />)}
      </HorizontalGrid>
    </Wrapper>
  );
}

const mapStateToProps = (state: State) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(Planner);
