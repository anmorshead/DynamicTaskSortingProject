import express from 'express';
import Task from '../../models/Task.js';
import { calculatePriority } from '../../helpers.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// GET all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Fetch all tasks from the database

    // Update the priority for each task based on the current date
    const updatedTasks = await Promise.all(tasks.map(async (task) => {
      const newPriority = calculatePriority(task.dueDate);
      // Update only if the priority has changed
      if (task.priority !== newPriority) {
        task.priority = newPriority;
        await task.save();
      }
      return task;
    }));
    
    res.json(updatedTasks); // Send tasks as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', authMiddleware, async (req, res) => {
  const { text, dueDate, priority } = req.body;
  
  // Convert the dueDate to a string in 'YYYY-MM-DD' format
  const formattedDueDate = new Date(dueDate).toISOString().split('T')[0]; // ** remove when introducing time **

  const task = new Task({ text, dueDate: formattedDueDate, priority, user: req.user.id }); //associate task with logged in user
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH a task (implement if time)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Ensure the task belongs to the logged-in user
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update the task with the provided ID
    task.completed = completed;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




export default router;