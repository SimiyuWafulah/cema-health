import express from 'express';
import { createProgram, getPrograms } from '../controllers/program.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Health program management endpoints
 */

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new health program (Doctor/Sysadmin)
 *     tags: [Programs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramCreateRequest'
 *     responses:
 *       201:
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgramResponse'
 */
router.post('/',protect,restrictTo('doctor', 'sysadmin'),createProgram);

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get list of health programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: List of health programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProgramResponse'
 */
router.get('/',
  getPrograms
);

export default router;