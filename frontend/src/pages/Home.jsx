import React from 'react';
import { Button, Typography, Container, Box, AppBar, Toolbar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#000' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
              letterSpacing: '-0.5px',
              padding: '8px 16px',
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
      <Box className='min-h-screen w-full relative'>
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
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  textAlign: 'center',
                  mb: 4,
                  letterSpacing: -0.5,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Your Ride, Your Way
              </Typography>

              <Button 
                variant="contained"
                endIcon={
                  <ArrowForwardIcon 
                    sx={{ 
                      transition: 'transform 0.3s ease',
                      fontSize: { xs: '20px', md: '24px' }
                    }} 
                  />
                }
                sx={{
                  background: '#000000',
                  color: '#FFFFFF',
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.2rem' },
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