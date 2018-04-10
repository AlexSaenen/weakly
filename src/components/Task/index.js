import React from 'react';
import Wrapper from './Wrapper';

const startTime = 7; // TODO: get this information better
const endTime = 24;
const dayLength = endTime - startTime;

export default function Task({ task }) {
  const startingPosition = task.hour - startTime; // TODO: do checks

  return (
    <Wrapper style={{ position: 'absolute', width: '100%', top: `calc((${startingPosition} * 500px) / ${dayLength})`, height: `calc((${task.duration} * 500px) / ${dayLength})` }}>
      {task.name}
    </Wrapper>
  );
};

// TODO: propTypes
