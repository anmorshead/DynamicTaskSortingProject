import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//router
import taskRouter from './routes/api/tasks.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Define routes 
app.use('/api/tasks', taskRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
