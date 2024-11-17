import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate('/profile');
      return;
    }

    const fetchBookings = async () => {
      const userId = user.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/book/getAppointments`, {
          params: { userId }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setEditedDescription(booking.description);
    setOpenEditDialog(true);
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/book/deleteAppointment/${bookingId}`);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleEditSave = async () => {
    try {
      const updatedBooking = { ...currentBooking, description: editedDescription };
      await axios.put(`http://localhost:5000/api/book/updateAppointment/${currentBooking._id}`, updatedBooking);
      setBookings(bookings.map(booking => booking._id === currentBooking._id ? updatedBooking : booking));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4 }}>
        My Bookings
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking._id}>
                <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {booking.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {booking.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {booking.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      { booking.staus === 'accepted'?
                      <>
                      <Button variant="contained" color="primary" onClick={() => handleEditClick(booking)}>
                        Edit
                      </Button> 
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(booking._id)}>
                        Delete
                      </Button>
                      </>: null
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No bookings available.
              </Typography>
            </Box>
          )}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings;
