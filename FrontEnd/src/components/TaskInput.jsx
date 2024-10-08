import React from 'react';

function TaskInput() {
  return (
    <div className="task-input-container">
      <form className="task-input-form">
        <input type="text" placeholder="Enter Your Task and Select a Due Date" className="task-input" />
        <input type="date" className="date-input"/>
        <select className="priority-select">
          <option disabled selected value ="choose">Priority Level...</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="task-submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskInput;
