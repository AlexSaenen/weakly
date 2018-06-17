// @flow

import React, { Component } from 'react';
import Wrapper from './Wrapper';

export type RawTask = {
  +name: string,
  +notes: string,
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

type State = Props & {
  showMore: boolean,
};

const startsAt: number = 7; // TODO: get this information better
const lasts: number = 17;

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
    console.log(`TaskItem.render()#${task.id}`);
    const { showMore } = this.state;
    const startingPosition: number = task.hour - startsAt; // TODO: do checks

    return (
      <Wrapper
        style={{
          position: 'absolute',
          width: '100%',
          top: `calc((${startingPosition} * 500px) / ${lasts})`,
          height: `calc((${task.duration} * 500px) / ${lasts})`
        }}
        onMouseEnter={this.showMore}
        onMouseLeave={this.showLess}
      >
        <div>
          {task.name}
        </div>
        {showMore &&
          <div>
            {task.notes}
          </div>
        }
      </Wrapper>
    );
  }
};

export default TaskItem;
