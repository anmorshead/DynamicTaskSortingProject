import React, {useState} from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText && dueDate && priority) {
      addTask({ text: taskText, dueDate, priority });
      setTaskText('');
      setDueDate('');
      setPriority('');
    }
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
    </div>
  );
}

export default TaskInput;
