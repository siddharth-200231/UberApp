import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box, AppBar, Toolbar, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = "cab.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/User-login');
  };

  return (
    <Box sx={{ backgroundColor: '#000' }}>
      {/* Navbar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            py: { xs: 2, sm: 2.5 },
            px: { xs: 2, sm: 4, md: 6 },
            maxWidth: 1400,
            mx: 'auto',
            width: '100%'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
              letterSpacing: '-0.5px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '30%',
                height: '2px',
                background: '#276EF1',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
                opacity: 0
              },
              '&:hover': {
                color: '#fff',
                transform: 'translateY(-1px)',
                '&::after': {
                  width: '100%',
                  opacity: 1
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
                overflow: 'hidden',
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
              {/* Loading placeholder */}
              {!imageLoaded && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress sx={{ color: 'white' }} />
                </Box>
              )}

              {/* Optimized image */}
              <img 
                src="cab.jpg"
                alt="Cab Service"
                loading="eager"
                fetchpriority="high"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  filter: 'brightness(1)',
                  backgroundColor: '#000', // Fallback
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
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

             

              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 3, sm: 5 },
                mt: 6,
                '& button': {
                  transition: 'all 0.3s ease'
                }
              }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/User-signup')}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: '#000',
                    px: { xs: 6, sm: 8 },
                    py: { xs: 1.8, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  Get started as Passenger
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate('/Captain-Signup')}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.8)',
                    borderWidth: '2px',
                    color: '#fff',
                    px: { xs: 6, sm: 8 },
                    py: { xs: 1.7, sm: 1.9 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Get started as Driver
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Start;