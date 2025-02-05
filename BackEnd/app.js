import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers
import taskRouter from './routes/api/tasks.js';
import authRoutes from './routes/api/auth.js';

dotenv.config({ path: '../BackEnd/.env' });

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies
  })
);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define routes
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRoutes);

// Health check route (for cron job)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Resolve __dirname for ES Modules
  app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

  // Serve the frontend's index.html for any unknown route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../FrontEnd/dist', 'index.html'));
  });
}

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
