import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState({
    name: '',
    email: '',
    captainToken: '',
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

  return (
    <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;