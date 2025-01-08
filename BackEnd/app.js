import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';

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
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Allow requests from this origin
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

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Resolve __dirname for ES Modules
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve the frontend's index.html for any unknown route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
