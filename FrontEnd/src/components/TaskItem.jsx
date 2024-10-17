import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-item">
      <li className="task">
        {task.text} - <span className="due-date">Due: {task.dueDate}</span>
      </li>
      <button className="done-button">Done</button>
    </div>
  );
}

export default TaskItem;
