import React, { createContext } from "react";

export const UserContext = ({ children }) => {
  const UserDataContext = createContext();
  return (
    <div>
      <UserDataContext.Provider>{children}</UserDataContext.Provider>
    </div>
  );
};
