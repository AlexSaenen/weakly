// @flow

import React from 'react';
import Wrapper from './Wrapper';

export type RawTask = {
  +name: string,
  +day: string,
  +hour: number,
  +duration: number,
};

export type Task = RawTask & {
  +id: number,
};

type Props = {
  +task: Task
};

const startsAt: number = 7; // TODO: get this information better
const lasts: number = 17;

export default function TaskItem({ task }: Props) {
  const startingPosition: number = task.hour - startsAt; // TODO: do checks

  return (
    <Wrapper
      style={{
        position: 'absolute',
        width: '100%',
        top: `calc((${startingPosition} * 500px) / ${lasts})`,
        height: `calc((${task.duration} * 500px) / ${lasts})`
      }}
    >
      {task.name}
    </Wrapper>
  );
};
