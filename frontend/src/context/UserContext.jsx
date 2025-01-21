import React, { createContext, useState } from "react";

// Create context outside component
export const UserDataContext = createContext();

// Rename to UserContextProvider for clarity
export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    token: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
