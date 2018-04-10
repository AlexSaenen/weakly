import React from 'react';
import Wrapper from './Wrapper';

const toTwelveHourCycle = hour => `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;

export default function HourLabels() {
  const startingHour = 7;
  const endingHour = 24;
  const amountOfHours = endingHour - startingHour;
  const hours = Array
    .from(new Array(amountOfHours), (_, hour) => hour + startingHour)
    .map(toTwelveHourCycle); // TODO: all this should be computed only once and passed as props

  return (
    <Wrapper>
      {hours.map(hour =>
        <div key={hour} style={{ color: '#aaa', fontSize: '0.8em', borderTop: '1px dashed #aaa' }}>
          {hour}
        </div>
      )}
    </Wrapper>
  );
};
