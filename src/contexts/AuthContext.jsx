// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getLocalStorage('currentUser'));

  const login = (user) => {
    setLocalStorage('currentUser', user);
    setCurrentUser(user);
  };

  const logout = () => {
    removeLocalStorage('currentUser');
    setCurrentUser(null);
  };

  const registerUser = (user) => {
    const users = getLocalStorage('users') || [];
    setLocalStorage('users', [...users, user]);
    login(user);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getLocalStorage('currentUser'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
