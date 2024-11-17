import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const AppointmentBooking = () => {
  const location = useLocation(); 
  const { category } = location.state || { category: 'General Physician' };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    username: location.state.user.username,
    maild: '',
    appointmentDate: '',
    userId: location.state.user.id,
    category: location.state || 'General Physician'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username')
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/book/createAppointment`, {
        username: username,
        formData: formData
      });
      console.log('Appointment Details:', response.data);
      navigate('/dashboard'); 
      localStorage.setItem('username', username)
      alert(`Appointment booked for ${category}!`);
    } catch (err) {
      alert(`Failed Appointment booking for ${category}!`);
      console.error('Login error:', err);
    }
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
                    name="maild"
                    type="maild"
                    value={formData.maild}
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
