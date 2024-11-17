import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ email: '', contactNumber: '', city: '', id: '' , category: '' });
  const [isEditing, setIsEditing] = useState(false);

  const username = localStorage.getItem('username');
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${username}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [username]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Create a copy of the profile object to send as the payload
      const updatedProfile = { ...profile };
      await axios.put(`http://localhost:5000/api/${username}`, updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Profile
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
            {username}
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!isEditing}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={profile.contactNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!isEditing}
            />
            <TextField
              label="City"
              name="city"
              value={profile.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={!isEditing}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Cancel
              </Button>
            ) : (
                profile.category === 'patient'?(
                  <Button variant="contained" color="primary" onClick={() => navigate('/get-appointment', { state: { user: { ...profile } } } )}>
                    Get Appointemnts
                  </Button>
                )
                : null
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
