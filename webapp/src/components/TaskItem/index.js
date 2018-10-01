/* @flow */

import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import type { Map } from 'immutable';
import type { Task } from 'ducks/schemas';
import { DragItemTypes } from '@/constants';
// import Wrapper from './Wrapper';

type Props = {
  +task: Map<Task>,
};

type State = Props & {
  showMore: boolean,
};

const dayStartsAt: number = 420; // TODO: get this information better
const dayDuration: number = 1020;

class TaskItem extends Component<Props, State> {
  state = {
    ...this.state,
    showMore: false,
  };

  showMore = () => {
    this.setState({
      showMore: true,
    });
  }

  showLess = () => {
    this.setState({
      showMore: false,
    });
  }

  render() {
    const { task } = this.props;
    console.log(`TaskItem.render()#${task.get('id')}`);
    const { connectDragSource } = this.props;
    const { showMore } = this.state;
    const startingPosition: number = task.get('time') - dayStartsAt; // TODO: do checks
    const taskDuration = task.get('duration');

    const toPixel = (amount, range) => `calc((${amount} * 500px) / ${range})`;

    // <Wrapper
    return connectDragSource(
      <div
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          width: '100%',
          top: toPixel(startingPosition, dayDuration),
          height: toPixel(taskDuration, dayDuration),
        }}
        // onMouseEnter={this.showMore}
        // onMouseLeave={this.showLess}
      >
        <div>
          {task.get('name')}
        </div>
        {showMore &&
          <div>
            {task.get('notes')}
          </div>
        }
      </div>
    );
  }
};

const taskSource = {
  beginDrag(props) {
    return { id: props.task.get('id') };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

export default DragSource(DragItemTypes.TASK, taskSource, collect)(TaskItem);
