import axios from 'axios';
const API_URL = 'http://localhost:3001/appointment';
export const fetchAppointments = async (start, end) => {
    try {
      const response = await axios.get(API_URL, { params: { start, end } });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export async function fetchPatientNames(patientIds) {
    try {
      const response = await fetch(`http://localhost:3001/patient?ids=${patientIds.join(',')}`);
      if (!response.ok) {
        throw new Error('Error fetching patient names');
      }
      const data = await response.json();
      return data.map(patient => ({ id: patient.id, name: `${patient.firstName} ${patient.lastName}` }));
    } catch (error) {
      throw new Error(`Error fetching patient names: ${error.message}`);
    }
  }
