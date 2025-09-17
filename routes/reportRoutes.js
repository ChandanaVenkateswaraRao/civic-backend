import express from 'express';
const router = express.Router();
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
} from '../controllers/reportController.js'; // <-- Add .js
import { protect, admin } from '../middleware/authMiddleware.js'; // <-- Add .js

router.route('/').post(protect, createReport).get(protect, getReports);
router.route('/:id').get(protect, getReportById).put(protect, admin, updateReportStatus);

export default router;