import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const UserSignup = () => {
  const navigate = useNavigate();
  const[fullname , setFullname] = useState('');
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!fullname || !email || !password) {
      setError('All fields are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/users/register', {
        fullname,
        email,
        password
      });

      if (response.status === 201) { // Backend returns 201 for successful creation
        // Store token if needed
        localStorage.setItem('token', response.data.token);
        navigate('/User-profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Header */}
      <Box sx={{ 
        py: 2, 
        px: 3, 
        borderBottom: '1px solid #eee',
        bgcolor: '#fff'
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ 
            color: '#000',
            textTransform: 'none'
          }}
        >
          Back
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={1} sx={{ p: 4, borderRadius: 1 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Create an account
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
              value={fullname}
              onChange={(e) =>setFullname(e.target.value)} 
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 4 }}
            />

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
                onClick={() => navigate('/User-login')}
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

export default UserSignup;