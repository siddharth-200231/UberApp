import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import API_URL from '../api';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const UserLogin = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API_URL}/users/login`, { 
        email, 
        password 
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        
        // Store token
        localStorage.setItem('token', token);
        localStorage.removeItem('CaptainToken');
        
        // Update context with user data
        setUserData({
          name: user.fullname,
          email: user.email,
          token: token
        });

        // Navigate after context update
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 3, sm: 2 } }}>
          <Typography 
            variant="h4" 
            onClick={() => navigate('/')}
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: '#000',
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

      <div className="min-h-screen bg-white flex flex-col pt-24">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Sign in to GoCab
              </h1>
            </div>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign in
              </button>
            </form>

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => navigate('/User-signup')}
                className="text-sm text-gray-600 hover:text-black"
              >
                Don't have an account? Sign up
              </button>
              <button
                onClick={() => navigate('/Captain-login')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Login as Captain instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserLogin;