import React from 'react';

function CompletedTasks({ completedTasks }) {
  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Tasks</h2>
      <ul className="space-y-2">
        {completedTasks.map((task) => (
          <li key={task._id} className="p-2 border-b border-gray-300 last:border-b-0">
            <span className="text-lg text-gray-700">{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasks;
