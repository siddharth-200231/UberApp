import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import API_URL from '../api';

const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/User-login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = response.data;
        setUserData({
          name: user.fullname,
          email: user.email,
          token: token
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Profile fetch failed:', error);
        localStorage.removeItem('token');
        navigate('/User-login');
      }
    };

    fetchProfile();
  }, [navigate, setUserData]);

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

export default UserProtected;