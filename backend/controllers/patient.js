const Patient = require('../models/patient');

// CREATE
const createPatient = async (req, res) => {
    const {firstName, lastName, email, phoneNumber} = req.body;
    try {
        const patient = await Patient.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            phoneNumber : phoneNumber
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: 'Unable to create patient \n' + String(error) });
    }
};

// READ ALL
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch patients' });
    }
};

// READ ONE
const getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        res.json(patient)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch patient' });
    }
};

// UPDATE
const updatePatient = async (req, res) => {
    const { id } = req.params;
    const {firstName, lastName, email, phoneNumber} = req.body;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        patient.update({
            firstName : firstName,
            lastName : lastName,
            email : email,
            phoneNumber : phoneNumber
        });
        await patient.save();
        res.json(patient);
    } catch (error) {
        res.status(400).json({ error: 'Unable to update patient' });
    }
};

// DELETE
const deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        await patient.destroy();
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete patient' });
    }
};

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
};
