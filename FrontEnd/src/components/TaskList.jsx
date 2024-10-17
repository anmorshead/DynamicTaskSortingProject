import React from 'react';
import TaskItem from './TaskItem.jsx';


function TaskList({ title, priority, tasks }) {
  return (
    <div className={`task-list ${priority}`}>
      <h2>{title}</h2>
      <ul className="task-items">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

