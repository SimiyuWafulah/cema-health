import { Program } from '../models/relationships.js';

export const createProgram = async (req, res) => {
  try {
    const program = await Program.create({
      name: req.body.name,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      status: 'success',
      data: program
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json({
      status: 'success',
      results: programs.length,
      data: programs
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};