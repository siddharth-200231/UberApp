import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import API_URL from '../api';
const CaptainSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    vechile: {
      color: '',
      plate: '',
      vechileType: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post( `${API_URL}/captains/register` , formData);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        navigate('/Captain-profile');

      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const vechileTypes = ['car', 'auto', 'bike'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Box sx={{ 
        py: 2, 
        px: 3, 
        borderBottom: '1px solid #eee',
        bgcolor: '#fff'
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: '#000', textTransform: 'none' }}
        >
          Back
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={1} sx={{ p: 4, borderRadius: 1 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Register as Captain
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Join our network of professional drivers. Please provide your personal and vehicle details below.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              helperText="Minimum 3 characters required"
              value={formData.fullname}
              onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              helperText="Enter a valid email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              helperText="Minimum 6 characters required"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />

            {/* Vehicle Details Section */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              Vehicle Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Please provide accurate vehicle information for passenger identification.
            </Typography>
            <TextField
              fullWidth
              label="Vehicle Color"
              helperText="Minimum 3 characters required"
              value={formData.vechile.color}
              onChange={(e) => setFormData({
                ...formData, 
                vechile: {...formData.vechile, color: e.target.value}
              })}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Vehicle Plate Number"
              helperText="Minimum 3 characters required"
              value={formData.vechile.plate}
              onChange={(e) => setFormData({
                ...formData,
                vechile: {...formData.vechile, plate: e.target.value}
              })}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Vehicle Type"
              helperText="Select your vehicle type"
              value={formData.vechile.vechileType}
              onChange={(e) => setFormData({
                ...formData,
                vechile: {...formData.vechile, vechileType: e.target.value}
              })}
              margin="normal"
              required
              sx={{ mb: 4 }}
            >
              {vechileTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: '#000',
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#333' }
              }}
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Already have an account?{' '}
              <Button 
                onClick={() => navigate('/Captain-login')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#000'
                }}
              >
                Sign in
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CaptainSignup;