import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AppointmentBooking = () => {
  const location = useLocation(); 
  const { category } = location.state || { category: 'General Physician' };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    appointmentDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend API
    console.log('Appointment Details:', formData);
    alert(`Appointment booked for ${category}!`);
    navigate('/');
  };

  return (
    <>
    <Navbar />
      <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5" component="div" gutterBottom>
              Book Your Appointment
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Category: {category}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Appointment Date and Time"
                    name="appointmentDate"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Book Appointment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default AppointmentBooking;
