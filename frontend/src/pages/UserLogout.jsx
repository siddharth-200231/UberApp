import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import API_URL from '../api';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const logout = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        // Make logout API call with token
        await axios.post(
          `${API_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Clear localStorage
        localStorage.removeItem('token');
        
        // Reset user context
        setUserData({
          name: '',
          email: '',
          token: ''
        });

        // Redirect to login
        navigate('/User-login');
        
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/User-login');
      }
    };

    logout();
  }, [navigate, setUserData]);

  return null;
};

export default UserLogout;