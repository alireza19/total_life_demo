const { validationResult } = require('express-validator');
const axios = require('axios');
const Clinician = require('../models/clinician');

const validateClinician = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, NPI_number, state } = req.body;

    try {
        // Validate NPI number against NPI Registry API
        const response = await axios.get(`https://npiregistry.cms.hhs.gov/api/?number=${NPI_number}&version=2.1`);
        const npiData = response.data;

        if (!npiData || !npiData.results || npiData.results.length === 0) {
            return res.status(400).json({ errors: [{ msg: 'Invalid NPI number' }] });
        }

        const clinicianData = npiData.results[0];

        // Check if the clinician's information matches with the request data
        if (clinicianData.basic?.first_name !== firstName ||
            clinicianData.basic?.last_name !== lastName ||
            clinicianData.addresses[0]?.state !== state) {
            return res.status(400).json({ errors: [{ msg: 'Clinician information does not match NPI registry' }] });
        }

        // Check if the NPI number already exists in the database
        const existingClinician = await Clinician.findOne({ where: { NPI_number } });
        if (existingClinician) {
            return res.status(400).json({ errors: [{ msg: 'Clinician with this NPI number already exists' }] });
        }

        // If everything is valid, return true
        next();
    } catch (error) {
        console.error('Error validating clinician:', error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
        // If an error occurs, return false
        next(false);
    }
};

module.exports = validateClinician;
