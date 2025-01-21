import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import API_URL from '../api';

const CaptainProtected = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCaptainData } = useContext(CaptainDataContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/Captain-login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const captain = response.data;
        setCaptainData({
          name: captain.fullname,
          email: captain.email,
          captainToken: token,
          vechile: captain.vechile,
          status: captain.status,
          location: captain.location
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Profile fetch failed:', error);
        localStorage.removeItem('token');
        navigate('/Captain-login');
      }
    };

    fetchProfile();
  }, [navigate, setCaptainData]);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default CaptainProtected;