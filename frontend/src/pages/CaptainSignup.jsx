import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:4000/captains/register', formData);
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
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Register as Captain
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
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
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Vehicle Details
            </Typography>

            <TextField
              fullWidth
              label="Vehicle Color"
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