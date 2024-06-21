import React, { createContext, useState, useContext } from 'react';

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext({}); // тут нужно затипизировать будет 

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState(null); 

  // Example function to login (replace with your actual authentication logic)
  // const login = () => {
  //   // Simulating login logic
  //   setUser('user');
  // };

  // Example function to logout
  const logout = () => {
    setUser(null);
  };

  // Value object to be provided as the context value
  const value = {
    user,
    logout,
  };

  // Provide the context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};