import { Patient, Program } from '../models/relationships.js';

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      doctor_id: req.user.id
    });

    if (req.body.programIds) {
      const programs = await Program.findAll({
        where: { id: req.body.programIds }
      });
      await patient.addPrograms(programs);
    }

    const newPatient = await Patient.findByPk(patient.id, {
      include: [Program]
    });

    res.status(201).json({
      status: 'success',
      data: newPatient
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { doctor_id: req.user.id },
      include: [Program]
    });

    res.json({
      status: 'success',
      results: patients.length,
      data: patients
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};