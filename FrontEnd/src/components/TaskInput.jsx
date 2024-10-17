import React, {useState} from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
       // Error handling: Check if due date or priority is not selected
       if (!taskText || !dueDate || !priority) {
        setError('Please fill out all fields, including due date and priority level.');
        return;
      }
  
      // Clear error if all fields are filled
      setError('');
      addTask({ text: taskText, dueDate, priority });
      setTaskText('');
      setDueDate('');
      setPriority('');
  };

  return (
    <div className="task-input-container">
      <form className="task-input-form" onSubmit = {handleSubmit}>
        <input type="text" 
          placeholder="Enter Your Task and Select a Due Date" 
          className="task-input" 
          value = {taskText}
          onChange = {(e) => setTaskText(e.target.value)}
        />
        <input type="date" 
          className="date-input"
          value = {dueDate}
          onChange = {(e) => setDueDate(e.target.value)}
          />
        <select className="priority-select"
          value = {priority || ""}
          onChange = {(e) => setPriority(e.target.value)}
        >
          <option value ="" disabled >Priority Level...</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="task-submit">Add Task</button>
      </form>

        {/* Display error message if there is an error */}
        {error && <p className="error-message">{error}</p>}
        
    </div>
  );
}

export default TaskInput;
