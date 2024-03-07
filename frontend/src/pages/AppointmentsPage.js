import React, { useState, useEffect } from 'react';
import { fetchAppointments, fetchPatientNames } from '../services/api';
import AppointmentItem from '../components/AppointmentItem';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleFilter = async () => {
    let startDate = new Date();
    let endDate = new Date();

    switch (filterOption) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'this_week':
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate.setDate(startDate.getDate() + 6);
        break;
      case 'past_month':
        startDate.setDate(1);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);
        break;
      default:
        // No filter selected
        break;
    }

    setStart(startDate.toISOString());
    setEnd(endDate.toISOString());
  };

  useEffect(() => {
    if (filterOption) {
      handleFilter();
    }
  }, [filterOption]);

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };

  const fetchAppointmentsData = async () => {
    try {
        const appointmentsData = await fetchAppointments(start, end);
        const patientIds = appointmentsData.map(appointment => appointment.patientId);
        const patientNames = await fetchPatientNames(patientIds);
        const appointmentsWithNames = appointmentsData.map(appointment => {
          const patient = patientNames.find(patient => patient.id === appointment.PatientId);
          return { ...appointment, patientName: patient ? patient.name : 'Unknown' };
        });
        setAppointments(appointmentsWithNames);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
  };

  useEffect(() => {
    if (start && end) {
      fetchAppointmentsData();
    }
  }, [start, end]);

  return (
    <div>
      <h1>Appointments</h1>
      <div>
        <button onClick={() => handleFilterOptionChange('today')}>Today</button>
        <button onClick={() => handleFilterOptionChange('this_week')}>This Week</button>
        <button onClick={() => handleFilterOptionChange('past_month')}>Past Month</button>
      </div>
      <ul>
      {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsPage;
