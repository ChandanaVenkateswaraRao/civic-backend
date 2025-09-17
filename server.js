import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

// --- THIS IS THE CRITICAL PATH CORRECTION ---
const __dirname = path.resolve();

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/backend/uploads')));


if (process.env.NODE_ENV === 'production') {
  // CORRECTED PATH: Go up from /backend to the root, then into /frontend/build
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // For any route that is not an API route, send the frontend's index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));