const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware for parsing JSON request body
app.use(express.json());

const clinicianRoutes = require('./routes/clinician');
const patientRoutes = require('./routes/patient');
const appointmentRoutes = require('./routes/appointment');

// Mount routes
app.use('/clinician', clinicianRoutes);
app.use('/patient', patientRoutes);
app.use('/appointment', appointmentRoutes);

// Sync models with the database
db.sync()
  .then(() => {
    console.log('Database tables synced successfully');
  })
  .catch(err => {
    console.error('Unable to sync database tables:', err);
  });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
