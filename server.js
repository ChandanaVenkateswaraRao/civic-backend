import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; // 1. Import helmet
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();
const app = express();

// --- Middlewares ---
// 2. Use helmet() to set secure HTTP headers. It should be one of the first.
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

// --- Static Assets ---
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Deployment Configuration ---
// This part is useful for production builds
if (process.env.NODE_ENV === 'production') {
  // If in production, also serve the frontend's static files
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // For any route that is not an API route, send the frontend's index.html
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));