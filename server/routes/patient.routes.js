import express from 'express';
import { createPatient, getPatients } from '../controllers/patient.controller.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validatePatient } from '../middlewares/validate.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management endpoints
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient (Doctor only)
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientCreateRequest'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientResponse'
 *       400:
 *         description: Validation error
 */
router.post('/',
  protect,
  restrictTo('doctor'),
  validatePatient,
  createPatient
);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get list of patients
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PatientResponse'
 */
router.get('/',
  protect,
  restrictTo('doctor', 'sysadmin'),
  getPatients
);

export default router;