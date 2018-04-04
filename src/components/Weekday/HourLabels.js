import React from 'react';

export default function HourLabels() {
  const hours = Array.from(new Array(17), (_, index) => index + 7); // TODO: AM and PM

  return (
    <div style={{ justifyItems: 'end' }}> {/* Create Wrapper as styled-component */}
      {hours.map(hour =>
        <div key={hour} style={{ color: '#aaa' }}>
          {hour}h
        </div>
      )}
    </div>
  );
};
