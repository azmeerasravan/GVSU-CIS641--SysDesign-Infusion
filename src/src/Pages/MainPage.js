import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid, Paper, Box, Button, Card, CardContent } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Change from '@mui/icons-material/ChangeCircle'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { id: 1, name: 'General Physician', color: '#F48FB1' },
  { id: 2, name: 'Dermatology', color: '#81D4FA' },
  { id: 3, name: 'Cardiology', color: '#A5D6A7' },
  { id: 4, name: 'Neurology', color: '#FFAB91' },
  { id: 5, name: 'Orthopedics', color: '#CE93D8' },
  { id: 6, name: 'Pediatrics', color: '#FFE082' }
];

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem('username');
      const { data } = await axios.get(`http://localhost:5000/api/${username}`);
      setUser(data);

      if (data.category === 'doctor' || data.category === 'admin') {
        // Fetch appointments for the doctor
        const appointmentsData = await axios.get(`http://localhost:5000/api/book/getDoctorAppointments`);
        setAppointments(appointmentsData.data);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCategoryClick = async (category) => {
    if (user.category === 'patient') {
      navigate('/book-appointment', { state: { category: category.name, user } });
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSignOut = () => {
    alert('Signing out...');
    navigate('/login');
  };

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/book/status/${appointmentId}`, { status: 'accepted', user: user.category });
      setAppointments(appointments.map(appt => appt._id === appointmentId ? { ...appt, status: 'accepted' } : appt));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleUpdate =  () => navigate('/updateUser')

  const updateUserRole = async (userId, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update-category`, { role: role, user: userId });
      console.log(response)
      alert('Role updated successfully')
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/book/status/${appointmentId}`, { status: 'complete', user: user.category });
      setAppointments(appointments.map(appt => appt._id === appointmentId ? { ...appt, status: 'complete' } : appt));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/book/status/${appointmentId}`, { status: 'rejected', user: user.category });
      setAppointments(appointments.map(appt => appt._id === appointmentId ? { ...appt, status: 'rejected' } : appt));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Appointment Management System
          </Typography>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>
          { (user?.category === 'admin') && 
            <IconButton color="inherit" onClick={handleUpdate}>
              <Change />
            </IconButton>
          }
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {user?.category === 'patient' && (
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Paper
                sx={{
                  padding: '20px',
                  textAlign: 'center',
                  margin: '20px',
                  backgroundColor: category.color,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {(user?.category === 'doctor' || user?.category === 'admin') && (
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          {appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment._id}>
              <Card sx={{ padding: '20px', margin: '20px', backgroundColor: '#f3f3f3' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body1">Date & Time: {appointment.date}</Typography>
                  <Typography variant="body1">Status: {appointment.status}</Typography>
                  {
                    appointment.status !== 'complete' ?
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAcceptAppointment(appointment._id)}
                          disabled={appointment.status === 'accepted' || appointment.status === 'rejected' || appointment.status === 'complete'}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRejectAppointment(appointment._id)}
                          disabled={appointment.status === 'accepted' || appointment.status === 'rejected' || appointment.status === 'complete'}
                        >
                          Reject
                        </Button>
                      </Box> : null
                  }
                  <br></br>
                  {appointment.status === 'accepted' ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteAppointment(appointment._id)}
                        disabled={appointment.status === 'complete'}
                      >
                        Mark Complete
                      </Button>
                    </Box>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MainPage;
