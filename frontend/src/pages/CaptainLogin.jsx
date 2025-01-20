import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import api from "../api";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/captains/login`, 
        { email, password }
      );
      if (res.status === 200) {
        navigate("/Captain-profile");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setEmail("");
    setPassword("");
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
                Captain Login
              </h1>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                New to GoCab?
              </p>
              <button
                onClick={() => navigate('/Captain-signup')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Create a Captain account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CaptainLogin;
