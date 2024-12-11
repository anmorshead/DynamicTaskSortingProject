//schema
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  dueDate: { type: String, required: true },
  priority: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link the task to a user
    required: true,
  },

}, { collection: 'tasks' });

const Task = mongoose.model('Task', taskSchema);
export default Task;

