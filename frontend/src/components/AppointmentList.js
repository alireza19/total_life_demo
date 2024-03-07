import React from 'react';
import AppointmentItem from './AppointmentItem';

function AppointmentList({ appointments }) {
  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
