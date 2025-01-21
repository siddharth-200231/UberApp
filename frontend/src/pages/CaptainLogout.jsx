import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import API_URL from '../api';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  useEffect(() => {
    const logout = async () => {
      try {
        // Get token
        const token = localStorage.getItem('CaptainToken');
        
        // Call logout API
        await axios.post(
          `${API_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Clear localStorage
        localStorage.removeItem('CaptainToken');
        
        // Reset captain context
        setCaptainData({
          name: '',
          email: '',
          CaptainToken: '',
          vechile: {
            color: '',
            plate: '',
            vechileType: ''
          },
          status: 'inactive',
          location: {
            lat: null,
            lng: null
          }
        });

        // Redirect to login
        navigate('/Captain-login');
        
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/Captain-login');
      }
    };

    logout();
  }, [navigate, setCaptainData]);

  return null;
};

export default CaptainLogout;