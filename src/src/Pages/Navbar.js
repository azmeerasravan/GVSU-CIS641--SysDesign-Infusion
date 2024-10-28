import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Handler when profile icon is clicked
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Handler when sign out icon is clicked
  const handleSignOut = () => {
    // Sign out logic (clear tokens, reset session, etc.)
    navigate('/login');
  };

  // Handler when home icon is clicked
  const handleHomeClick = () => {
    navigate('/main'); // Navigating to main page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home Icon (placed on the left before the title) */}
        <IconButton color="inherit" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>

        {/* App title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Appointment Management System
        </Typography>

        {/* Profile Icon */}
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>

        {/* Sign Out Icon */}
        <IconButton color="inherit" onClick={handleSignOut}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
