import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const CaptainHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Captain-logout');
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      <Button
        onClick={handleLogout}
        variant="outlined"
        color="error"
        sx={{
          textTransform: 'none',
          borderRadius: 1
        }}
      >
        Logout
      </Button>

      <Box sx={{ 
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h4">
          Welcome Captain
        </Typography>
      </Box>
    </Box>
  );
};

export default CaptainHome;