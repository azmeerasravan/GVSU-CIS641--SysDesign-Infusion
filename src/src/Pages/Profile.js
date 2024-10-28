import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Placeholder data for the profile
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Cityville',
  };

  // Handler for the Edit button
  const handleEditClick = () => {
    navigate('/profile/edit');
  };

  // Handler for the Appointments button
  const handleAppointmentsClick = () => {
    navigate('/appointments');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Profile
            </Typography>

            {/* User Details */}
            <Typography variant="body1" color="text.secondary">
              <strong>Name:</strong> {userData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Phone:</strong> {userData.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Address:</strong> {userData.address}
            </Typography>

            {/* Buttons: Edit and Appointments */}
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={handleAppointmentsClick}>
                Appointments
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
