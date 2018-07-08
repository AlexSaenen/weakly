// @flow

import React, { Component } from 'react';
import type { Map } from 'immutable';
import type { Task } from 'ducks/schemas';
import Wrapper from './Wrapper';

type Props = {
  +task: Map<Task>,
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
    console.log(`TaskItem.render()#${task.get('id')}`);
    const { showMore } = this.state;
    const startingPosition: number = task.get('hour') - startsAt; // TODO: do checks

    return (
      <Wrapper
        style={{
          position: 'absolute',
          width: '100%',
          top: `calc((${startingPosition} * 500px) / ${lasts})`,
          height: `calc((${task.get('duration')} * 500px) / ${lasts})`
        }}
        onMouseEnter={this.showMore}
        onMouseLeave={this.showLess}
      >
        <div>
          {task.get('name')}
        </div>
        {showMore &&
          <div>
            {task.get('notes')}
          </div>
        }
      </Wrapper>
    );
  }
};

export default TaskItem;
