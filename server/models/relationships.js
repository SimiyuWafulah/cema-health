import Patient from "./patient.model.js";
import Program from "./program.model.js"
import User from "./users.model.js"


User.hasMany(Patient,{foreignKey: 'doctor_id'});
Patient.belongsTo(User, {foreignKey : 'doctor_id'});
Patient.belongsToMany(Program, {through: 'patient_programs'});
Program.belongsToMany(Patient, {through : 'patient_programs'});

export {User, Patient, Program}