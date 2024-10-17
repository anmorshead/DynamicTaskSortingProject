import React, {useState} from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app-container">
      <h1>Dynamic Task Sorting</h1>
      <TaskInput addTask={addTask}/>

      <div className="task-lists-container">
        <TaskList title="URGENT" priority="urgent" tasks={tasks.filter(task => task.priority==="urgent")}/>
        <TaskList title="High Priority" priority="high" tasks={tasks.filter(task => task.priority==="high")}/>
        <TaskList title="Moderate Priority" priority="moderate" tasks={tasks.filter(task => task.priority==="moderate")}/>
        <TaskList title="Low Priority" priority="low" tasks={tasks.filter(task => task.priority==="low")}/>
      </div>
    </div>
  );
}

export default App;

