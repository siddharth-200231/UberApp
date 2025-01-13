import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Grid,
  Divider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserLogin = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#ffffff'
    }}>
      {/* Header */}
      <Box sx={{ 
        py: 2.5,
        px: { xs: 2, md: 4 },
        borderBottom: '1px solid #eee',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: '#fff',
        zIndex: 10
      }}>
        <Container maxWidth="sm">
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: '#000',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Back
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="sm" 
        sx={{ 
          mt: { xs: 8, md: 10 },
          mb: 4,
          height: 'calc(100vh - 100px)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Sign in to ride
          </Typography>

          <form>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#000'
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#000'
                  }
                }
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#000',
                color: '#fff',
                py: 1.8,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: '#333'
                }
              }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography color="textSecondary">
              Don't have an account?{' '}
              <Button 
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#000',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign up
              </Button>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Button 
              sx={{ 
                textTransform: 'none',
                color: '#666',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#000'
                }
              }}
            >
              Login as Captain
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserLogin;