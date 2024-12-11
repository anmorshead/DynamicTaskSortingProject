import React from 'react';

function TaskItem({ task, completeTask }) {
  return (
    <div className="task-item">
      <li className="task">
        {task.text} - <span className="due-date">Due: {task.dueDate}</span>
      </li>
      <button 
        className="done-button" 
        onClick={() => completeTask(task._id)} 
      >
        Done
      </button>
    </div>
  );
}

export default TaskItem;
