import express from 'express';
import Task from '../../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.json(tasks); // Send tasks as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { text, dueDate, priority } = req.body; // Change title to text
  const task = new Task({ text, dueDate, priority });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
