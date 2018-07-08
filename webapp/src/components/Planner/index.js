// @flow

import React from 'react';

import type { DayRange } from '@/hours';

import Weekday from 'containers/Weekday';
import Wrapper from './Wrapper';
import HorizontalGrid from './HorizontalGrid';

type Props = {};

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

  return (
    <Wrapper>
      <HorizontalGrid>
        {weekDays.map(day => <Weekday key={day} day={day} range={dayRange} />)}
      </HorizontalGrid>
    </Wrapper>
  );
}

export default Planner;
