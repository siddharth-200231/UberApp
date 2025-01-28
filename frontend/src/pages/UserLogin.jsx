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
        
        localStorage.setItem('token', token);
        localStorage.removeItem('Captaintoken');
       
        setUserData({
          name: user.fullname,
          email: user.email,
          token: token
        });
        
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <AppBar position="fixed" sx={{ bgcolor: '#09091A', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
          <Typography 
            variant="h4" 
            onClick={() => navigate('/')}
            sx={{ 
              fontFamily: 'Uber Move, sans-serif',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '-0.5px',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            Go<span style={{ color: '#1FBAD6' }}>Cab</span>
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your rider account</p>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FBAD6] focus:border-[#1FBAD6] transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FBAD6] focus:border-[#1FBAD6] transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#09091A] text-white rounded-lg font-medium hover:bg-[#1a1a2c] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#1FBAD6]"
              >
                Sign In
              </button>
            </form>

            <div className="text-center space-y-4">
              <button
                onClick={() => navigate('/User-signup')}
                className="text-sm text-[#1FBAD6] hover:text-[#1694a8] font-medium"
              >
                Create a rider account
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#f8f9fa] text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/Captain-login')}
                className="w-full py-3 border-2 border-[#09091A] rounded-lg font-medium text-[#09091A] hover:bg-gray-50 transition-colors"
              >
                Driver Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Uber-style Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10" style={{
        backgroundImage: 'radial-gradient(#1FBAD6 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>
    </Box>
  );
};

export default UserLogin;