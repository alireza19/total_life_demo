const express = require('express');
// include controllers
const clinicianController = require('../controllers/clinician');
const validateClinician = require('../middleware/validateClinician');
const router = express.Router();

// clinician routes
router.post('/', validateClinician, clinicianController.createClinician);
router.get('/', clinicianController.getClinicians);
router.get('/:id', clinicianController.getClinicianById);
router.put('/:id', clinicianController.updateClinician);
router.delete('/:id', clinicianController.deleteClinician);

module.exports = router;
