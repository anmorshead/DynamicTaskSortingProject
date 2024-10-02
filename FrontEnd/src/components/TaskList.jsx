import React from 'react';

function TaskList({ priority }) {
  return (
    <div className={`task-list ${priority.toLowerCase()}-priority`}>
      <h2>{priority} Priority Tasks</h2>
      <ul className="task-items">
        {/* Placeholder for tasks */}
        <li className="task-item">Sample Task</li>
        <li className="task-item">Sample Task</li>
        <li className="task-item">Sample Task</li>
      </ul>
    </div>
  );
}

export default TaskList;
