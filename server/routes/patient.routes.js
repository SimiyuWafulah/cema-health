import express from 'express';
import { createPatient, getPatients } from '../controllers/patient.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validatePatient } from '../middlewares/validate.js';

const router = express.Router();

router.post('/',
  protect,
  restrictTo('doctor'),
  validatePatient,
  createPatient
);

router.get('/',
  protect,
  restrictTo('doctor', 'sysadmin'), // Sysadmin can view all
  getPatients
);

export default router;