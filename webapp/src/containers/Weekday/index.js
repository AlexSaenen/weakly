// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';

import { createHoursFromRange, type DayRange } from '@/hours';
import TasksList from 'components/TasksList';
import type { Task } from 'ducks/schemas';

import HourLabels from './HourLabels';
import DayLabel from './DayLabel';
import DayContentGrid from './DayContentGrid';
import { getTasks } from './selectors';

type Props = {
  +day: string,
  +range: DayRange,
  +tasks: Map<Task>,
};

function Weekday(props: Props) {
  const {
    day,
    range,
    tasks,
  } = props;
  console.log(`Weekday.render()#${day}`);
  const hours = createHoursFromRange(range);

  return (
    <div>
      <DayLabel>
        {day}
      </DayLabel>

      <DayContentGrid>
        <HourLabels hours={hours} />
        <TasksList tasks={tasks} />
      </DayContentGrid>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  tasks: getTasks(state, props),
});

export default connect(mapStateToProps)(Weekday);
