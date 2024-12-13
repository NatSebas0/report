// src/utils/notificationUtils.js
import { getLocalStorage, setLocalStorage } from './localStorage';

export const addNotification = (notification) => {
  // notification = {type, message, time, read, userEmail}
  const notifications = getLocalStorage('notifications') || [];
  notifications.push({
    id: Date.now().toString(),
    ...notification
  });
  setLocalStorage('notifications', notifications);
};

export const getNotificationsForUser = (email) => {
  const notifications = getLocalStorage('notifications') || [];
  return notifications.filter(n => n.userEmail === email);
};

export const markAllAsRead = (email) => {
  const notifications = getLocalStorage('notifications') || [];
  const updated = notifications.map(n => {
    if (n.userEmail === email) {
      return { ...n, read: true };
    }
    return n;
  });
  setLocalStorage('notifications', updated);
};

export const getUnreadCount = (email) => {
  const notifications = getLocalStorage('notifications') || [];
  return notifications.filter(n => n.userEmail === email && !n.read).length;
};
