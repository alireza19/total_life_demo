const express = require('express');
// include controllers
const appointmentController = require('../controllers/appointment');
const router = express.Router();

// appointment routes
router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
