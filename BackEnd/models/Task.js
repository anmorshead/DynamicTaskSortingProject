//schema
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true }
}, { collection: 'tasks' });

const Task = mongoose.model('Task', taskSchema);
export default Task;

