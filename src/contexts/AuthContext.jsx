import React, { createContext, useState, useEffect } from "react";

// Create Context
const AppContext = createContext();

// Provider Component
const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  // Function to save token and store it in localStorage
  const saveToken = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  // Function to remove token and clear from localStorage
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  // Function to log in and set token
  const login = (newToken) => {
    saveToken(newToken);
  };

  return (
    <AppContext.Provider value={{ token, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
const useAppContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider, useAppContext };
