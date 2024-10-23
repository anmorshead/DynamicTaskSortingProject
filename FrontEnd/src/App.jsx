import React, {useEffect,useState} from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import CompletedTasks from './components/CompletedTasks.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (newTask) => {
    console.log('Adding task:', newTask);
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    console.log('Updated tasks:', tasks);
  }, [tasks]); // This effect runs whenever 'tasks' changes

  const completeTask = (index) => {
    console.log('Current tasks:', tasks);
    console.log('Tasks length:', tasks.length);
    if (index >= 0 && index < tasks.length) {
      const taskToComplete = tasks[index];
      console.log('Completing task:', taskToComplete);
      if (taskToComplete) {
        setCompletedTasks([...completedTasks, taskToComplete]);
        setTasks(tasks.filter((_, i) => i !== index));
        
        // Log to confirm state updates
        console.log('Updated completedTasks:', [...completedTasks, taskToComplete]);
        console.log('Updated tasks:', tasks.filter((_, i) => i !== index));
      }
    } else {
      console.log('Invalid task index:', index);
    }
};


  return (
    <div className="app-container">
      <h1>Dynamic Task Sorting</h1>
      <TaskInput addTask={addTask}/>

      <div className="task-lists-container">
        <TaskList title="URGENT" priority="urgent" tasks={tasks.filter(task => task.priority==="urgent")}completeTask={completeTask}/>
        <TaskList title="High Priority" priority="high" tasks={tasks.filter(task => task.priority==="high")}completeTask={completeTask}/>
        <TaskList title="Moderate Priority" priority="moderate" tasks={tasks.filter(task => task.priority==="moderate")}completeTask={completeTask}/>
        <TaskList title="Low Priority" priority="low" tasks={tasks.filter(task => task.priority==="low")}completeTask={completeTask}/>
      </div>
      <CompletedTasks completedTasks={completedTasks} />
    </div>
  );


// return (
//   <div className="app-container">
//     <h1>Login Form</h1>
//     <LoginForm handleLogin={(data) => console.log('Login Data:', data)} />
//   </div>
// );

// return (
//   <div className="app-container">
//     <h1>Login Form</h1>
//     <SignupForm handleLogin={(data) => console.log('Login Data:', data)} />
//   </div>
// );
}

export default App;

