import React from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <h1>Dynamic Task Sorting</h1>
      <TaskInput />

      <div className="task-lists-container">
        <TaskList title="URGENT" priority="urgent" />
        <TaskList title="High Priority" priority="high" />
        <TaskList title="Moderate Priority" priority="moderate" />
        <TaskList title="Low Priority" priority="low" />
      </div>
    </div>
  );
}

export default App;

