import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, MenuItem, Box } from '@mui/material';
import Navbar from './Navbar';

const UpdateRolePage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [newRole, setNewRole] = useState('doctor');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/users', { category: 'patient' });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUser) {
            setMessage('Please select a user.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/update-category`, {
                username: selectedUser,
                category: newRole
            });
            setMessage(response.data.message || 'User role updated successfully!');
            setSelectedUser('');
        } catch (error) {
            console.error('Error updating user role:', error);
            setMessage('Failed to update user role.');
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" style={{ marginTop: '40px' }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Update User Role
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                    <TextField
                        select
                        label="Select User"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.username}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="New Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="doctor">Doctor</MenuItem>
                    </TextField>

                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                        Update Role
                    </Button>
                </Box>

                {message && (
                    <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {message}
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default UpdateRolePage;
