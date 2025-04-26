import {body, validationResult } from 'express-validator';

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid Email address'),
    body('password').isLength({min: 8}).withMessage('Password should be atleast 8 characters')
    .matches(/\d/).withMessage('must contain a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next();
    }
]


export const validatePatient = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('contact')
    .matches(/^(\+?[0-9]{10,15})$/)
    .withMessage('Invalid phone number format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateProgram = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Program name must be at least 2 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];