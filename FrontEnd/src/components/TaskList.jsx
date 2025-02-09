import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ title, priority, tasks, completeTask }) {
  const borderColors = {
    urgent: 'border-red-500',
    high: 'border-orange-500',
    moderate: 'border-yellow-500',
    low: 'border-green-500',
  };

  return (
    <div className={`border-8 ${borderColors[priority] || 'border-gray-200'} p-4 rounded-md border bg-white mb-10`}>
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <TaskItem 
            key={task._id || index} 
            task={task} 
            completeTask={completeTask} 
            isLast={index === tasks.length - 1} 
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
