const Appointment = require('../models/appointment');
const { Op } = require('sequelize');

// CREATE APPOINTMENTS
const createAppointment = async (req, res) => {
    const { ClinicianId, PatientId, appointmentTime, status } = req.body;
    try {
        const appointment = await Appointment.create({
            ClinicianId : ClinicianId,
            PatientId : PatientId,
            appointmentTime : appointmentTime,
            status : status
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: "Unable to create appointment" });
    }
}

// READ ALL APPOINTMENTS
const getAppointments = async (req, res) => {
    try {
        if (req.query.start && req.query.end) {
            const { start, end } = req.query;
            const appointments = await Appointment.findAll({
                where: {
                    appointmentTime: {
                      [Op.between]: [start, end]
                    }
                  }
            });
            res.json(appointments);
        } else {
            const appointments = await Appointment.findAll();
            res.json(appointments);
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch appointments ' + String(error)});
    }
};

// READ ONE
const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found!' });
        }
        res.json(appointment)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch appointment' });
    }
};

// UPDATE
const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { ClinicianId, PatientId, appointmentTime, status } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found!' });
        }
        appointment.update({
            ClinicianId : ClinicianId,
            PatientId : PatientId,
            appointmentTime : appointmentTime,
            status : status
        });
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: 'Unable to update appointment' });
    }
};

// DELETE
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found!' });
        }
        await appointment.destroy();
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete appointment' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
