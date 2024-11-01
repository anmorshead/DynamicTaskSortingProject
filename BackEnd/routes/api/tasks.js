import express from 'express';
import Task from '../../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { text, dueDate, priority } = req.body;
  const task = new Task({ text, dueDate, priority });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
