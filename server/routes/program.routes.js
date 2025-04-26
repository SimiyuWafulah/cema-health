import express from 'express';
import { createProgram, getPrograms } from '../controllers/program.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.post('/',
  protect,
  restrictTo('doctor', 'sysadmin'), // Both can create programs
  createProgram
);

router.get('/',
  protect,
  getPrograms
);

export default router;