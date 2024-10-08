import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-item">
      <li className="task">{task}</li>
      <button className="done-button">Done</button>
    </div>
  );
}

export default TaskItem;
