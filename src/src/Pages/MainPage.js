import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid, Paper, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

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

  const handleCategoryClick = (category) => {
    // Navigate to the appointment booking page and pass the category
    navigate('/book-appointment', { state: { category: category.name } });
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    navigate('/profile');
  };

  const handleSignOut = () => {
    // Implement sign-out functionality
    alert('Signing out...');
    navigate('/login');
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
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
    </Box>
  );
};

export default MainPage;
