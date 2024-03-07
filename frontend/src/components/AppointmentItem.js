import React from 'react';

function AppointmentItem({ appointment }) {
  const { PatientId, patientName, appointmentTime, status } = appointment;

  return (
    <li className="appointment-item">
      <div>ID: {PatientId}</div>
      <div>Patient: {patientName}</div>
      <div>Time: {appointmentTime}</div>
      <div>Status: {status}</div>
    </li>
  );
}

export default AppointmentItem;
