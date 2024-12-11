import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

//router
import taskRouter from './routes/api/tasks.js'
import authRoutes from './routes/api/auth.js';

dotenv.config({ path: './backend/.env' });


const app = express();
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies
}))

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Define routes 
app.use('/api/tasks', taskRouter)
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
