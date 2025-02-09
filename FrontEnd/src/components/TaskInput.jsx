import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Error handling: Check if due date or task text is not selected
    if (!taskText || !dueDate) { 
      setError('Please fill out all fields, including due date and priority level.');
      return;
    }

    // Clear error if all fields are filled
    setError('');
    addTask({ text: taskText, dueDate });
    setTaskText('');
    setDueDate('');
  };

  return (
    <div className="my-10">
      <form className="grid grid-cols-1 md:grid-cols-12 gap-10 md:w-auto w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Task and Select a Due Date"
          className="w-full md:col-span-6 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input
          type="date"
          className="w-full md:col-span-4 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className="w-full md:col-span-2 p-3 bg-[#007bff] text-white rounded-md hover:bg-[#025ec1] transition-colors"
        >
          Add Task
        </button>
      </form>

      {/* Display error message if there is an error */}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default TaskInput;
