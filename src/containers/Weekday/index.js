import React from 'react';
import Tasks from 'components/Tasks';
import HourLabels from './HourLabels';
import DayLabel from './DayLabel';
import DayContentGrid from './DayContentGrid';

const tasks = [
  {
    name: 'hello world',
    day: 'wednesday',
    hour: 10,
    duration: 1.50,
  },
  {
    name: 'pancakes',
    day: 'thursday',
    hour: 15,
    duration: 0.80,
  },
  {
    name: 'gym',
    day: 'monday',
    hour: 19,
    duration: 2,
  },
  {
    name: 'gym',
    day: 'wednesday',
    hour: 19,
    duration: 2,
  },
  {
    name: 'gym',
    day: 'friday',
    hour: 19,
    duration: 2,
  },
].map((task, index) => ({ ...task, id: index }));

export default function Weekday({ day }) {
  // TODO: do this on the upper level (reselect maybe)
  const dayTasks = tasks.filter(task => task.day === day.toLowerCase());

  return (
    <div>
      <DayLabel>
        {day}
      </DayLabel>

      <DayContentGrid>
        <HourLabels />
        <Tasks tasks={dayTasks} />
        {/* <Tasks tasks={tasks} /> */}
      </DayContentGrid>
    </div>
  );
};
