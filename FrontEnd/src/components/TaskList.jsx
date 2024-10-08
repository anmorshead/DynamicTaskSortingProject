import React from 'react';
import TaskItem from './TaskItem.jsx';


function TaskList({ title, priority }) {
  return (
    <div className={`task-list ${priority}`}>
      <h2>{title}</h2>
      <ul className="task-items">
        {/* Placeholder tasks for now */}
        <TaskItem task="Sample Task 1" />
        <TaskItem task="Sample Task 2" />
      </ul>
    </div>
  );
}

export default TaskList;

