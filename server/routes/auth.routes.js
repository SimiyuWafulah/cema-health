import express from 'express';
import {login} from '../controllers/auth.controller.js'
import {validateLogin} from '../middlewares/validate.js'

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     requestBody:
 *       required: true
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *               password:
 *                type: string
 *    responses:
 *     200:
 *       description: login successful
 *     
 */

router.post('/login', validateLogin, login);

export default router