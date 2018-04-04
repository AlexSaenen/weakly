import React from 'react';
import Tasks from 'components/Tasks';
import HourLabels from './HourLabels';
import DayLabel from './DayLabel';
import DayContentGrid from './DayContentGrid';

export default function Weekday({ day }) {
  return (
    <div>
      <DayLabel>
        {day}
      </DayLabel>

      <DayContentGrid>
        <HourLabels />
        <Tasks />
      </DayContentGrid>
    </div>
  );
};
