import React from 'react';
import { Button, Typography, Container, Box, AppBar, Toolbar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ backgroundColor: '#000' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 3, sm: 2 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '2.8rem', md: '3rem' },
              letterSpacing: '-0.5px',
              padding: { xs: '12px 20px', sm: '10px 18px' },
              position: 'relative',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 16,
                width: '40px',
                height: '3px',
                background: '#276EF1',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              },
              '&:hover': {
                color: '#276EF1',
                '&::after': {
                  width: '60px'
                }
              }
            }}
          >
            GoCab
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ minHeight: '100vh', position: 'relative' }}>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Box position="relative" height="100vh">
            {/* Background Image with Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
                  zIndex: 1
                }
              }}
            >
              <img 
                src="cab.jpg" 
                alt="Cab Service"
                className='h-full w-full object-cover'
                style={{ filter: 'brightness(0.8)' }}
              />
            </Box>

            {/* Content */}
            <Box 
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 8
              }}
            >
              <Typography 
                variant="h1" 
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '3.5rem', sm: '4rem', md: '5rem' },
                  textAlign: 'center',
                  mb: { xs: 4, sm: 5 },
                  pt: { xs: 15, sm: 20 },
                  letterSpacing: -0.5,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Your Ride Awaits
              </Typography>

              <Typography 
                variant="h6" 
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                  textAlign: 'center',
                  mb: { xs: 6, sm: 8 }
                }}
              >
                Travel with comfort and style
              </Typography>

              <Button 
                variant="contained"
                endIcon={
                  <ArrowForwardIcon 
                    sx={{ 
                      transition: 'transform 0.3s ease',
                      fontSize: { xs: '2rem', sm: '2.2rem' }
                    }} 
                  />
                }
                onClick={handleGetStarted}
                sx={{
                  background: '#000000',
                  color: '#FFFFFF',
                  px: { xs: 6, sm: 8 },
                  py: { xs: 2, sm: 2.5 },
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: '#333333',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    '& .MuiSvgIcon-root': {
                      transform: 'translateX(4px)'
                    }
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;