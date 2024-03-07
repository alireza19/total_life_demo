const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Clinician = require('./clinician');
const Patient = require('./patient');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  appointmentTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'canceled'),
    allowNull: false,
    defaultValue: 'scheduled'
  }
});

// each appointment belongs to one patient and one clinician
Appointment.belongsTo(Clinician);
Appointment.belongsTo(Patient);

module.exports = Appointment;
