// src/utils/dateUtils.js

export const formatDistance = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutos`;
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} horas`;
  
    const days = Math.floor(hours / 24);
    return `${days} días`;
  };
  