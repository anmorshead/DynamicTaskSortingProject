import React from 'react';

function CompletedTasks({ completedTasks }) {
  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      <ul className="task-items">
        {completedTasks.map((task, index) => (
          <li key={index} className="task-item">
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasks;