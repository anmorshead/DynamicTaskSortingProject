import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import CompletedTasks from './components/CompletedTasks.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const addTask = (newTask) => {
    const today = new Date();
    const dueDate = new Date(newTask.dueDate);
    const timeDiff = dueDate - today;
  
    // Calculate days until the due date
    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    // Determine priority
    let priority;
    if (daysUntilDue <= 2) {
      priority = 'urgent';
    } else if (daysUntilDue <= 7) {
      priority = 'high';
    } else if (daysUntilDue <= 10) {
      priority = 'moderate';
    } else {
      priority = 'low';
    }
  
    // Add task with calculated priority
    const taskWithPriority = { ...newTask, priority };
    console.log('Adding task:', taskWithPriority);
    setTasks([...tasks, taskWithPriority]);
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
  // Handle login
  const handleLogin = ({ email, password }) => {
    console.log('Login attempt:', email, password);
    // Add actual login logic here, for now, we just set login to true
    setIsLoggedIn(true);
  };

  // Handle signup
  const handleSignup = ({ email, password }) => {
    console.log('Signup attempt:', email, password);
    // Add actual signup logic here
    setIsLoggedIn(true); // Simulate login after signup
  };

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm handleSignup={handleSignup} />} />
        <Route 
          path="/" 
          exact 
          element={
            isLoggedIn ? (

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
              ): (
              <Navigate to="/login" />
            )
          }
          />
    
        </Routes>
      </div>
    </Router>
);


// return (
//   <div className="app-container">
//     <h1>Dynamic Task Sorting App</h1>
//     <LoginForm handleLogin={(data) => console.log('Login Data:', data)} />
//   </div>
// );

// return (
//   <div className="app-container">
//     <h1>Dynamic Task Sorting App</h1>
//     <SignupForm handleLogin={(data) => console.log('Login Data:', data)} />
//   </div>
// );
}

export default App;

