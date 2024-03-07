const Clinician = require('../models/clinician');

// CREATE
const createClinician = async (req, res) => {
    console.log(req.body);
    const {firstName, lastName, NPI_number, state} = req.body;
    try {
        const clinician = await Clinician.create({
            firstName : firstName,
            lastName : lastName,
            NPI_number : NPI_number,
            state : state
        });
        res.status(201).json(clinician);
    } catch (error) {
        res.status(400).json({ error: 'Unable to create clinician \n' + String(error) });
    }
};

// READ ALL
const getClinicians = async (req, res) => {
    try {
        const clinicians = await Clinician.findAll();
        res.json(clinicians);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch clinicians' });
    }
};

// READ ONE
const getClinicianById = async (req, res) => {
    const { id } = req.params;
    try {
        const clinician = await Clinician.findByPk(id);
        if (!clinician) {
            return res.status(404).json({ error: 'Clinician not found!' });
        }
        res.json(clinician)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch clinician' });
    }
};

// UPDATE
const updateClinician = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, NPI_number, state } = req.body;
    try {
        const clinician = await Clinician.findByPk(id);
        if (!clinician) {
            return res.status(404).json({ error: 'Clinician not found!' });
        }
        clinician.update({
            firstName : firstName,
            lastName : lastName,
            NPI_number : NPI_number,
            state : state
        });
        await clinician.save();
        res.json(clinician);
    } catch (error) {
        res.status(400).json({ error: 'Unable to update clinician' });
    }
};

// DELETE
const deleteClinician = async (req, res) => {
    const { id } = req.params;
    try {
        const clinician = await Clinician.findByPk(id);
        if (!clinician) {
            return res.status(404).json({ error: 'Clinician not found!' });
        }
        await clinician.destroy();
        res.json({ message: 'Clinician deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete clinician' });
    }
};

module.exports = {
    createClinician,
    getClinicians,
    getClinicianById,
    updateClinician,
    deleteClinician
};
