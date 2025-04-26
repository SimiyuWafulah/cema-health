import express from 'express';
import { createUser } from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.post('/',
  protect,
  restrictTo('sysadmin'), // Only sysadmin can create users
  createUser
);

export default router;