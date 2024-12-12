// src/utils/localStorage.js

export const getLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error obteniendo ${key} de localStorage:`, error);
      return null;
    }
  };
  
  export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error estableciendo ${key} en localStorage:`, error);
    }
  };
  
  export const removeLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando ${key} de localStorage:`, error);
    }
  };
  