// @flow

import React, { Component, type Element } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
// import { Subject } from 'rxjs';
// import {
//   distinctUntilKeyChanged,
//   distinctUntilChanged,
//   map,
// } from 'rxjs/operators';
import type { Map } from 'immutable';

import { DragItemTypes } from '@/constants';
import TaskItem from 'components/TaskItem';
import type { Task } from 'ducks/schemas';

// import Wrapper from './Wrapper';

// FIXME: where should we put this ? or at least get it from ?
// const dayDuration = 1020;
// const nockSize = 5;
// const totalHeight = 500;

// const toPixel = (amount, range) => `calc((${amount} * 500px) / ${range})`;
// const toMinutes = (amount, range) => ((amount / range) * dayDuration);
// const atLeastZero = (number: number): number => (number >= 0 ? number : 0);

const taskListTarget = {
  drop(props) {},
  hover(props, monitor, reactElement) {
    // console.log(props, monitor, reactElement);
    const node = findDOMNode(reactElement);
    if (node === null || node.getBoundingClientRect === undefined) return;
    /* FIXME: make this costly process go through an observable, throttle the amount
      of calls and memoize what is redundant information. Or even better, try to do this once
      when the drag starts and then just update the position with the offset difference */

    // const domRect = node.getBoundingClientRect();
    // const yInternalOffset = atLeastZero(monitor.getClientOffset().y - domRect.y);
    /* TODO: emit an action, create a drag reducer and append a representation of
      the placeholder in the store, whenever hover updates the position, use our
      createDragEventEmitter below to throttle and control the changes in the placeholder's
      position. Even if with this function, we have access to our TaskList container's instance,
      we should keep this function pure and without side effects, going through redux-observable and
      redux achieves that goal */
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

// const createDragEventEmitter = (subject) => {
//   const stg = subject
//     .asObservable()
//     .pipe(
//       distinctUntilChanged(undefined, ev => ev.nativeEvent.layerY),
//       map((ev: SyntheticEvent<*>) => {
//         // console.log(ev.nativeEvent.layerY);
//         ev.preventDefault();
//         const dragEvent = ev.nativeEvent;
//         const fromTop = dragEvent.layerY;
//         const minutesFromStart = toMinutes(fromTop, totalHeight);
//         console.log('minutes', minutesFromStart);
//         const minuteNock = Math.abs(minutesFromStart / nockSize) * nockSize;
//         console.log('nock', minuteNock);
//         return { dragEvent, minuteNock };
//       }),
//       distinctUntilKeyChanged('minuteNock'),
//     );
//
//   return stg;
// };
  // .distinctUntilKeyChanged('nativeEvent.layerY') // FIXME: is this extra step needed ?
  // .distinctUntilKeyChanged('minuteNock')
/* TODO: we still need to complete the Observable to:
  - subscribe that triggers a setState
  - unsubscribe in case onDragLeave (it seems buggy)
  - when about to rerender => pause
  - when rerender done => resume and takeLatest value if any */

type State = {
  domDropPlaceholder: ?Element<*>,
};

type Props = {
  +tasks: Map<Task>,
};

class TasksList extends Component<Props, State> {
  state = {
    domDropPlaceholder: null,
  }

  render() {
    const {
      tasks,
      connectDropTarget,
    } = this.props;
    // const { x, y, connectDropTarget, isOver } = this.props;
    console.log('TasksList.render()');
    const { domDropPlaceholder } = this.state;

    console.log(domDropPlaceholder);
    /* FIXME: the placeholder and tasklist should be separated:
      - DayTasks should have a Wrapper (onDrag* events and Observable here)
      - In the Wrapper, we have a DropPlaceholder component
      - In the Wrapper, we have the TasksList component */

    return connectDropTarget(
      <div
        style={{
          backgroundColor: 'rgba(155, 193, 255, 0.2)',
          position: 'relative',
        }}
      >
        {domDropPlaceholder}
        {tasks.map((task) =>
          <TaskItem
            key={task.get('id')}
            task={task}
          />)}
      </div>
    );
  }
};

export default DropTarget(DragItemTypes.TASK, taskListTarget, collect)(TasksList);
