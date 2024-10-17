import React from 'react';

function TaskItem({ task, index, completeTask, tasks }) {
  return (
    <div className="task-item">
      <li className="task">
        {task.text} - <span className="due-date">Due: {task.dueDate}</span>
      </li>
      <button className="done-button" onClick={() => {
          console.log('Button clicked for index:', index);
          console.log('Tasks length when button clicked:', tasks.length); // Add this line
          completeTask(index);
        }}>Done</button>
    </div>
  );
}

export default TaskItem;
