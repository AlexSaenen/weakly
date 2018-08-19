// @flow

import React from 'react';

import { createHoursFromRange, type DayRange } from '@/hours';
import DayTasks from 'containers/DayTasks';

import HourLabels from './HourLabels';
import DayLabel from './DayLabel';
import DayContentGrid from './DayContentGrid';

type Props = {
  +day: string,
  +range: DayRange,
};

function Weekday(props: Props) {
  const {
    day,
    range,
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
        <DayTasks day={day} />
      </DayContentGrid>
    </div>
  );
};

export default Weekday;
