// @flow

import React from 'react';
import Wrapper from './Wrapper';
import HourLabel from './HourLabel';

type Props = {
  +hours: Array<string>,
};

export default function HourLabels({ hours }: Props) {
  return (
    <Wrapper>
      {hours.map((hour: string) => <HourLabel key={hour}>{hour}</HourLabel>)}
    </Wrapper>
  );
};
