import React from 'react';

function TaskItem({ task, completeTask, isLast }) {
  return (
    <div className={`flex flex-col p-4 ${!isLast ? "border-b border-gray-200" : ""}`}>
      <li className="text-lg w-full">
        {task.text} - <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
      </li>
      <button 
        className="w-full bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#025ec1] transition-colors mt-4"
        onClick={() => completeTask(task._id)}
      >
        Done
      </button>
    </div>
  );
}

export default TaskItem;


