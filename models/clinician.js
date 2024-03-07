const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Clinician = sequelize.define('Clinician', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NPI_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Clinician;
