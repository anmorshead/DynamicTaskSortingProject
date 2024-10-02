import React from 'react';
import TaskList from './TaskList';

function TaskBoard() {
  return (
    <div className="task-board">
      <TaskList priority="Very High" />
      <TaskList priority="High" />
      <TaskList priority="Moderate" />
      <TaskList priority="Low" />
    </div>
  );
}

export default TaskBoard;
