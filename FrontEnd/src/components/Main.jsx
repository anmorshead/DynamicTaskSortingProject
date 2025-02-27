import React, { useEffect, useState } from 'react';
import TaskInput from './TaskInput.jsx';
import TaskList from './TaskList.jsx';
import CompletedTasks from './CompletedTasks.jsx';
import NavBar from './NavBar.jsx';

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch tasks from the backend when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const tasksFromDb = await response.json();
          // Separate active and completed tasks
          const activeTasks = tasksFromDb.filter((task) => !task.completed);
          const completedTasks = tasksFromDb.filter((task) => task.completed);

          setTasks(activeTasks);
          setCompletedTasks(completedTasks);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const today = new Date();
    const dueDate = new Date(newTask.dueDate);
    const timeDiff = dueDate - today;

    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));

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

    const taskWithPriority = { ...newTask, priority };
    setTasks([...tasks, taskWithPriority]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskWithPriority),
        credentials: 'include',
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
      } else {
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setCompletedTasks([...completedTasks, updatedTask]);
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        console.error('Failed to complete task');
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-2 text-center">
      <NavBar />
      <h1 className="text-3xl font-bold text-gray-100">Taskmaster</h1>
      <TaskInput addTask={addTask} />

      {/* Grid container for TaskLists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <TaskList
          title="URGENT"
          priority="urgent"
          tasks={tasks.filter((task) => task.priority === 'urgent')}
          completeTask={completeTask}
        />
        <TaskList
          title="High Priority"
          priority="high"
          tasks={tasks.filter((task) => task.priority === 'high')}
          completeTask={completeTask}
        />
        <TaskList
          title="Moderate Priority"
          priority="moderate"
          tasks={tasks.filter((task) => task.priority === 'moderate')}
          completeTask={completeTask}
        />
        <TaskList
          title="Low Priority"
          priority="low"
          tasks={tasks.filter((task) => task.priority === 'low')}
          completeTask={completeTask}
        />
      </div>

      <CompletedTasks completedTasks={completedTasks} />
    </div>
  );
}
