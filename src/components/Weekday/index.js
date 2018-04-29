// @flow

import React from 'react';

import { createHoursFromRange, type DayRange } from '@/hours';
import TasksList, { type Tasks } from 'components/TasksList';

import HourLabels from './HourLabels';
import DayLabel from './DayLabel';
import DayContentGrid from './DayContentGrid';

type Props = {
  +day: string,
  +tasks: Tasks,
  +range: DayRange,
};

export default function Weekday(props: Props) {
  const {
    day,
    range,
    tasks,
  } = props;
  const normalizedDay = day.toLowerCase();
  const dayTasks = tasks.filter(task => task.day === normalizedDay); // TODO: to be replaced by reselect?
  const hours = createHoursFromRange(range);

  return (
    <div>
      <DayLabel>
        {day}
      </DayLabel>

      <DayContentGrid>
        <HourLabels hours={hours} />
        <TasksList tasks={dayTasks} />
      </DayContentGrid>
    </div>
  );
};
